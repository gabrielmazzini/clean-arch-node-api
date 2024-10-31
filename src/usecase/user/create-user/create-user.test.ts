import {it, beforeEach, describe, after, before} from "node:test";
import crypto from "node:crypto";
import { UserRepositoryLokijs } from "../../../infra/repositories/lokiJs/user-repository-lokijs";
import { CreateUserUsecase } from "./create-user-usecase";
import { Database } from "../../../infra/database/lokijs/database";
import { User } from "../../../domain/entity/user/UserEntity";
import { Birthdate } from "../../../domain/objectsValue/Birthdate";
import { CPF } from "../../../domain/objectsValue/Cpf";
import { Email } from "../../../domain/objectsValue/Email";
import assert from "node:assert";

describe("#create user", () => {
    let _userRepository: UserRepositoryLokijs;
    let _createUserUseCase: CreateUserUsecase;
    const database = Database.getInstance();

    const body = {
        name: "gabriel",
        lastName: "mazzini",
        birthdate: new Birthdate("1992/04/02"),
        cpf: new CPF("405.967.938-04"),
        email: new Email("gabriel@gmail.com"),
        address: {
        street: "teste",
        numberHome: "teste1",
        district: "teste1",
        complement: "teste2",
        city: "teste",
        state: "teste",
        country: "teste"
            },
         typeUser: "admin"
    }

    describe("you must be able to create a user", () => {
        const idFixed = "5c484254-c10c-43e6-b252-fcbe2a42c90e";

        before(() => {
            crypto.randomUUID = () => idFixed;
        });

        after(async () => {
            crypto.randomUUID = (await (import("node:crypto"))).randomUUID;
        });

        beforeEach(() => {
            _userRepository = UserRepositoryLokijs.create(database);
            _userRepository.createUser = async (user: User) => {
                return user;
            };
            _createUserUseCase = CreateUserUsecase.create(_userRepository);
        });

        it("you must be able to create a user", async () => {
            const expectedOutput = {
                message: "Create User Success",
                id: idFixed
            }
            _userRepository.createUser = async (user: User) => {
                return { id: user.id };
              };
            const result = await _createUserUseCase.execute(body);
            assert.deepStrictEqual(result, expectedOutput);
        });
    });

    describe("an exception should be returned if there are errors", () => {
        beforeEach(() => {
            _userRepository = UserRepositoryLokijs.create(database);
            _userRepository.createUser = async () => {
                throw new Error("Database connection failed")
            };
            _createUserUseCase = CreateUserUsecase.create(_userRepository);
        });

        it("an exception should be returned if there are errors", () => {
            assert.rejects(async () => {
                await _createUserUseCase.execute(body);
            },
            {
                message: "Server error: Database connection failed"
            }
          );
        });
    });
});