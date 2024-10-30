"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const user_repository_lokijs_1 = require("../lokiJs/user-repository-lokijs");
const database_1 = require("../../database/lokijs/database");
const UserEntity_1 = require("../../../domain/entity/user/UserEntity");
const Birthdate_1 = require("../../../domain/objectsValue/Birthdate");
const Cpf_1 = require("../../../domain/objectsValue/Cpf");
const Email_1 = require("../../../domain/objectsValue/Email");
(0, node_test_1.describe)("#User repository", () => {
    let db;
    let userRepository;
    (0, node_test_1.beforeEach)(() => {
        db = database_1.Database.getInstance();
        userRepository = user_repository_lokijs_1.UserRepositoryLokijs.create(db);
    });
    (0, node_test_1.describe)("Create user", () => {
        const user = new UserEntity_1.User({
            id: "123",
            name: "John",
            lastName: "Doe",
            birthdate: new Birthdate_1.Birthdate("1990-01-01"),
            cpf: new Cpf_1.CPF("405.967.938-04"),
            email: new Email_1.Email("john.doe@example.com"),
            address: {
                street: "Rua Exemplo",
                numberHome: "123",
                city: "São Paulo",
                district: "Centro",
                state: "SP",
                country: "Brasil"
            },
            typeUser: "admin",
        });
        (0, node_test_1.it)("should save user if successful", async () => {
            const result = await userRepository.createUser(user);
            node_assert_1.default.deepStrictEqual(result, {
                _id: "123",
                _name: "John",
                _lastName: "Doe",
                _birthdate: new Birthdate_1.Birthdate("1990-01-01"),
                _cpf: new Cpf_1.CPF("405.967.938-04"),
                _email: new Email_1.Email("john.doe@example.com"),
                _address: {
                    street: "Rua Exemplo",
                    numberHome: "123",
                    city: "São Paulo",
                    district: "Centro",
                    state: "SP",
                    country: "Brasil"
                },
                _typeUser: "admin",
            });
        });
        (0, node_test_1.it)("should return an exception if it has an unexpected error", () => {
            userRepository.createUser = async () => {
                throw new Error("Database connection failed");
            };
            node_assert_1.default.rejects(async () => {
                await userRepository.createUser(user);
            }, {
                message: "Database connection failed"
            });
        });
    });
    (0, node_test_1.describe)("List user", () => {
        (0, node_test_1.it)("should return the user if found", async () => {
            userRepository.list = async (id) => {
                if (id === "123") {
                    return UserEntity_1.User.with({
                        id: "123",
                        name: "John",
                        lastName: "Doe",
                        birthdate: new Birthdate_1.Birthdate("1990-01-01"),
                        cpf: new Cpf_1.CPF("405.967.938-04"),
                        email: new Email_1.Email("john.doe@example.com"),
                        address: {
                            street: "Rua Exemplo",
                            numberHome: "123",
                            city: "São Paulo",
                            district: "Centro",
                            state: "SP",
                            country: "Brasil"
                        },
                        typeUser: "admin",
                    });
                }
                else {
                    return null;
                }
            };
            const id = "123";
            const expected = UserEntity_1.User.with({
                id: "123",
                name: "John",
                lastName: "Doe",
                birthdate: new Birthdate_1.Birthdate("1990-01-01"),
                cpf: new Cpf_1.CPF("405.967.938-04"),
                email: new Email_1.Email("john.doe@example.com"),
                address: {
                    street: "Rua Exemplo",
                    numberHome: "123",
                    city: "São Paulo",
                    district: "Centro",
                    state: "SP",
                    country: "Brasil"
                },
                typeUser: "admin",
            });
            const result = await userRepository.list(id);
            node_assert_1.default.deepStrictEqual(result, expected);
        });
        (0, node_test_1.it)("should return null if it doesn't find a user", async () => {
            const id = "123";
            userRepository.list = async () => {
                return null;
            };
            const result = await userRepository.list(id);
            const expected = null;
            node_assert_1.default.deepStrictEqual(result, expected);
        });
        (0, node_test_1.it)("should return an exception if an unexpected error occurs", async () => {
            const id = "123";
            userRepository.list = async () => {
                throw new Error("Database connection failed");
            };
            node_assert_1.default.rejects(async () => {
                await userRepository.list(id);
            }, {
                message: "Database connection failed",
            });
        });
    });
});
