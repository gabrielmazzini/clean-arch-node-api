import {it, describe, beforeEach, before, after} from "node:test";
import assert from "node:assert";
import crypto from "node:crypto";
import { UpdateUserUsecase } from "./update-user-usecase";
import { UserRepositoryLokijs } from "../../../infra/repositories/lokiJs/user-repository-lokijs";
import { Database } from "../../../infra/database/lokijs/database";
import { Birthdate } from "../../../domain/objectsValue/Birthdate";
import { CPF } from "../../../domain/objectsValue/Cpf";
import { Email } from "../../../domain/objectsValue/Email";
import { User } from "../../../domain/entity/user/UserEntity";

describe("#Update user", () => {
    let _updateUserUsecase: UpdateUserUsecase
    let _userRepository: UserRepositoryLokijs
    let _db;
    const idFixed = "118a3ec0-ad96-485b-8105-0fddf9759997";
    const mockDatabase = User.with({
        id: "118a3ec0-ad96-485b-8105-0fddf9759997",
        name: "gabriel",
        lastName: "ramalho",
        birthdate: new Birthdate("02/04/1992"),
        cpf: new CPF("405.967.938-04"),
        email: new Email("gabriel@uon.dev"),
        address: {
            street: "rua 1",
            complement: "casa A",
            numberHome: "441",
            district: "bairro",
            state: "sp",
            city: "sfs",
            country: "brasil",
        },
        typeUser: "adim",
    });

    beforeEach(() => {
        _db = Database.getInstance();
        _userRepository = UserRepositoryLokijs.create(_db);
        _userRepository.updateUser = async (input: User) => {
            if(input.id === mockDatabase.id) {
                return true;
            } else {
                return false;
            };
        };
        _updateUserUsecase = UpdateUserUsecase.create(_userRepository);
    });

    it("Must successfully update a user", async () => {
        before(() => {
            crypto.randomUUID = () => idFixed;
        });
    
        after(async () => {
            crypto.randomUUID = (await (import("node:crypto"))).randomUUID;
        });
        const input = {
            id: "118a3ec0-ad96-485b-8105-0fddf9759997",
            name: "teste",
            lastName: "teste last name",
            birthdate: "02/04/1992",
            cpf: "40596793804",
            email: "gabriel@teba.com",
            address: {
                street: "teste2",
                numberHome: "teste1",
                district: "teste1",
                complement: "teste2",
                city: "teste2",
                state: "teste2",
                country: "teste2"
            },
            typeUser: "user",
        };
        const expected = {
            message: "update successfully",
            status: true
        };
        const result = await _updateUserUsecase.execute(input);
        assert.deepStrictEqual(result, expected);
    });

    it("should return an error if user does not exist", async () => {
        const id = "1-2-3-4-5";
        before(() => {
            crypto.randomUUID = () => id;
        });
    
        after(async () => {
            crypto.randomUUID = (await (import("node:crypto"))).randomUUID;
        });
        const input = {
            id: "123",
            name: "teste",
            lastName: "teste last name",
            birthdate: "02/04/1992",
            cpf: "40596793804",
            email: "gabriel@teba.com",
            address: {
                street: "teste2",
                numberHome: "teste1",
                district: "teste1",
                complement: "teste2",
                city: "teste2",
                state: "teste2",
                country: "teste2"
            },
            typeUser: "user",
        };
        assert.rejects(async () => {
            await _updateUserUsecase.execute(input);
        }, {
            message: "User not found",
        });
    });

    it("Should return server error", async () => {
        before(() => {
            _userRepository.updateUser = async () => {
                throw new Error("Server error");
            };
        });
        const input = {
            id: "118a3ec0-ad96-485b-8105-0fddf975999766",
            name: "teste",
            lastName: "teste last name",
            birthdate: "02/04/1992",
            cpf: "40596793804",
            email: "gabriel@teba.com",
            address: {
                street: "teste2",
                numberHome: "teste1",
                district: "teste1",
                complement: "teste2",
                city: "teste2",
                state: "teste2",
                country: "teste2"
            },
            typeUser: "user",
        };
        assert.rejects(async () => {
            await _updateUserUsecase.execute(input);
        }, {
            message: "Server error"
        });
    });

});