import {it, describe, beforeEach} from "node:test";
import assert from "node:assert";
import { UpdateUserUsecase } from "./update-user-usecase";
import { UserRepositoryLokijs } from "../../../infra/repositories/lokiJs/user-repository-lokijs";
import { Database } from "../../../infra/database/lokijs/database";
import { Birthdate } from "../../../domain/objectsValue/Birthdate";
import { CPF } from "../../../domain/objectsValue/Cpf";
import { Email } from "../../../domain/objectsValue/Email";

describe("#Update user", () => {
    let _updateUserusecase: UpdateUserUsecase
    let _userRepository: UserRepositoryLokijs
    let _db;

    beforeEach(() => {
        _db = Database.getInstance();
        _userRepository = UserRepositoryLokijs.create(_db);
        _updateUserusecase = UpdateUserUsecase.create(_userRepository);
    });

    it("Must successfully update a user", async () => {
        const id = "39f2870a-04f9-44d8-b731-49277fcded80";
        const name = "teste";
        const lastName = "teste last name";
        const birthdate = new Birthdate("02/04/1992");
        const cpf = new CPF("40596793804");
        const email = new Email("gabriel@teba.com");
        const address = {
          street: "teste2",
          numberHome: "teste1",
          district: "teste1",
          complement: "teste2",
          city: "teste2",
          state: "teste2",
          country: "teste2"
        };
        const typeUser = "user";

        const expected = {
            message: "update sucess",
            status: true
        };
        const result = await _updateUserusecase.execute({id, name, lastName, birthdate, cpf, email, 
            address, typeUser
        });
        assert.deepStrictEqual(result, expected);
    });
});