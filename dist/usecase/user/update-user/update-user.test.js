"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const update_user_usecase_1 = require("./update-user-usecase");
const user_repository_lokijs_1 = require("../../../infra/repositories/lokiJs/user-repository-lokijs");
const database_1 = require("../../../infra/database/lokijs/database");
const Birthdate_1 = require("../../../domain/objectsValue/Birthdate");
const Cpf_1 = require("../../../domain/objectsValue/Cpf");
const Email_1 = require("../../../domain/objectsValue/Email");
(0, node_test_1.describe)("#Update user", () => {
    let _updateUserusecase;
    let _userRepository;
    let _db;
    (0, node_test_1.beforeEach)(() => {
        _db = database_1.Database.getInstance();
        _userRepository = user_repository_lokijs_1.UserRepositoryLokijs.create(_db);
        _updateUserusecase = update_user_usecase_1.UpdateUserUsecase.create(_userRepository);
    });
    (0, node_test_1.it)("Must successfully update a user", async () => {
        const id = "39f2870a-04f9-44d8-b731-49277fcded80";
        const name = "teste";
        const lastName = "teste last name";
        const birthdate = new Birthdate_1.Birthdate("02/04/1992");
        const cpf = new Cpf_1.CPF("40596793804");
        const email = new Email_1.Email("gabriel@teba.com");
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
        const result = await _updateUserusecase.execute({ id, name, lastName, birthdate, cpf, email,
            address, typeUser
        });
        node_assert_1.default.deepStrictEqual(result, expected);
    });
});
