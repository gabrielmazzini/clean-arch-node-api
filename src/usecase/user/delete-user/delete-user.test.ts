import {it, beforeEach, describe, before} from "node:test";
import assert from "node:assert";
import { UserRepositoryLokijs } from "../../../infra/repositories/lokiJs/user-repository-lokijs";
import { DeleteUserUsecase } from "./delete-user-usecase";
import { User } from "../../../domain/entity/user/UserEntity";
import { Birthdate } from "../../../domain/objectsValue/Birthdate";
import { CPF } from "../../../domain/objectsValue/Cpf";
import { Email } from "../../../domain/objectsValue/Email";
import { Database } from "../../../infra/database/lokijs/database";

describe("#DeleteUser", () => {
    let userRepository: UserRepositoryLokijs;
    let deleteUserUsecase: DeleteUserUsecase;
    const mockDatabase = User.with({
        id: "1234",
        name: "john",
        lastName: "John",
        birthdate: new Birthdate("12/12/1993"),
        cpf: new CPF("405.967.938-04"),
        email: new Email("john@example.com"),
        address: {
            street: "John Street",
            numberHome: "1",
            district: "teste",
            city: "teste",
            state: "teste",
            country: "teste",
        },
        typeUser: "user"
    });
    beforeEach(() => {
        const db = Database.getInstance();
        userRepository = UserRepositoryLokijs.create(db);
        userRepository.deleteUser = async (id: string) => {
            if(id === mockDatabase.id) {
                return true;
            };
            return false;
        };
        deleteUserUsecase = DeleteUserUsecase.create(userRepository);
    });

    it("must return if successful", async () => {
        const id: string = "1234";
        const expected = { message: 'delete successfully', status: true };
        const result = await deleteUserUsecase.execute({id});
        assert.deepStrictEqual(result, expected);
    });

    it("should return error if user not found", async () => {
        const id: string = "123";
        await assert.rejects(async () => {
            await deleteUserUsecase.execute({id});
        }, {
            message: 'User not found',
        });
    });

    it("should return server error", async () => {
        const id: string = "123";
        before(() => {
            userRepository.deleteUser = async (id: string) => {
                throw new Error("server error");
            };
        });
        assert.rejects(async () => {
            await deleteUserUsecase.execute({id});
        }, {
            message: "server error",
        });
    });
});