"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const user_repository_lokijs_1 = require("../../../infra/repositories/lokiJs/user-repository-lokijs");
const delete_user_usecase_1 = require("./delete-user-usecase");
const UserEntity_1 = require("../../../domain/entity/user/UserEntity");
const Birthdate_1 = require("../../../domain/objectsValue/Birthdate");
const Cpf_1 = require("../../../domain/objectsValue/Cpf");
const Email_1 = require("../../../domain/objectsValue/Email");
const database_1 = require("../../../infra/database/lokijs/database");
(0, node_test_1.describe)("#DeleteUser", () => {
    let userRepository;
    let deleteUserUsecase;
    const mockDatabase = UserEntity_1.User.with({
        id: "1234",
        name: "john",
        lastName: "John",
        birthdate: new Birthdate_1.Birthdate("12/12/1993"),
        cpf: new Cpf_1.CPF("405.967.938-04"),
        email: new Email_1.Email("john@example.com"),
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
    (0, node_test_1.beforeEach)(() => {
        const db = database_1.Database.getInstance();
        userRepository = user_repository_lokijs_1.UserRepositoryLokijs.create(db);
        userRepository.deleteUser = async (id) => {
            if (id === mockDatabase.id) {
                return true;
            }
            ;
            return false;
        };
        deleteUserUsecase = delete_user_usecase_1.DeleteUserUsecase.create(userRepository);
    });
    (0, node_test_1.it)("must return if successful", async () => {
        const id = "1234";
        const expected = { message: 'delete successfully', status: true };
        const result = await deleteUserUsecase.execute({ id });
        node_assert_1.default.deepStrictEqual(result, expected);
    });
    (0, node_test_1.it)("should return error if user not found", async () => {
        const id = "123";
        await node_assert_1.default.rejects(async () => {
            await deleteUserUsecase.execute({ id });
        }, {
            message: 'User not found',
        });
    });
    (0, node_test_1.it)("should return server error", async () => {
        const id = "123";
        (0, node_test_1.before)(() => {
            userRepository.deleteUser = async (id) => {
                throw new Error("server error");
            };
        });
        node_assert_1.default.rejects(async () => {
            await deleteUserUsecase.execute({ id });
        }, {
            message: "server error",
        });
    });
});
