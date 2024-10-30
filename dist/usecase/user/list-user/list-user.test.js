"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const UserEntity_1 = require("../../../domain/entity/user/UserEntity");
const Birthdate_1 = require("../../../domain/objectsValue/Birthdate");
const Cpf_1 = require("../../../domain/objectsValue/Cpf");
const Email_1 = require("../../../domain/objectsValue/Email");
const list_user_usecase_1 = require("./list-user-usecase");
const database_1 = require("../../../infra/database/lokijs/database");
const user_repository_lokijs_1 = require("../../../infra/repositories/lokiJs/user-repository-lokijs");
(0, node_test_1.describe)("#list for id", () => {
    let _getUserUsecase;
    let _userRepository;
    const mockDatabase = UserEntity_1.User.with({
        id: "123",
        name: "John",
        lastName: "John",
        birthdate: new Birthdate_1.Birthdate("1992/04/02"),
        cpf: new Cpf_1.CPF("405.967.938-04"),
        email: new Email_1.Email("gabriel@gmail.com"),
        address: {
            street: "John Street",
            numberHome: "123",
            district: "centro",
            complement: "",
            city: "sp",
            country: "brasil",
            state: "sp",
        },
        typeUser: "admin"
    });
    function presenter(user) {
        const output = {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            birthdate: user.birthdate.format(),
            cpf: user.cpf.value(),
            email: user.email.value(),
            address: user.address,
            typeUser: user.typeUser
        };
        return output;
    }
    (0, node_test_1.describe)("must return a user that corresponds to the id sent", () => {
        (0, node_test_1.beforeEach)(() => {
            const database = database_1.Database.getInstance();
            _userRepository = user_repository_lokijs_1.UserRepositoryLokijs.create(database);
            _userRepository.list = async (id) => {
                if (id === mockDatabase.id) {
                    return mockDatabase;
                }
                return null;
            };
            _getUserUsecase = list_user_usecase_1.GetUserUsecase.create(_userRepository);
        });
        (0, node_test_1.it)("must return a user that corresponds to the id sent", async () => {
            const input = "123";
            const user = {
                id: mockDatabase.id,
                name: mockDatabase.name,
                lastName: mockDatabase.lastName,
                birthdate: mockDatabase.birthdate,
                cpf: mockDatabase.cpf,
                email: mockDatabase.email,
                address: mockDatabase.address,
                typeUser: mockDatabase.typeUser,
            };
            const result = await _getUserUsecase.execute({ id: input });
            const expected = presenter(user);
            node_assert_1.default.deepStrictEqual(expected, result);
        });
    });
    (0, node_test_1.describe)("error should be returned if no user is found", () => {
        (0, node_test_1.beforeEach)(() => {
            const database = database_1.Database.getInstance();
            _userRepository = user_repository_lokijs_1.UserRepositoryLokijs.create(database);
            _userRepository.list = async (id) => {
                if (id === mockDatabase.id) {
                    return mockDatabase;
                }
                return null;
            };
            _getUserUsecase = list_user_usecase_1.GetUserUsecase.create(_userRepository);
        });
        (0, node_test_1.it)("error should be returned if no user is found", async () => {
            const input = "";
            node_assert_1.default.rejects(async () => {
                await _getUserUsecase.execute({ id: input });
            }, {
                message: "User not found",
            });
        });
    });
});
