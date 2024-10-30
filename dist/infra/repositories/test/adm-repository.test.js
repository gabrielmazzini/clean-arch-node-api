"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const adm_repository_loki_1 = require("../lokiJs/adm-repository-loki");
const database_1 = require("../../database/lokijs/database");
const UserEntity_1 = require("../../../domain/entity/user/UserEntity");
const Birthdate_1 = require("../../../domain/objectsValue/Birthdate");
const Cpf_1 = require("../../../domain/objectsValue/Cpf");
const Email_1 = require("../../../domain/objectsValue/Email");
(0, node_test_1.describe)("#Adm repository", () => {
    let db;
    let admRepository;
    (0, node_test_1.beforeEach)(() => {
        db = database_1.Database.getInstance();
        admRepository = adm_repository_loki_1.AdminRespositoryLokijs.create(db);
    });
    (0, node_test_1.it)("should return a list of users if they exist", async () => {
        const expected = [
            UserEntity_1.User.with({
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
            }),
            UserEntity_1.User.with({
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
            })
        ];
        admRepository.listAllUsers = async () => {
            return [
                UserEntity_1.User.with({
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
                }),
                UserEntity_1.User.with({
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
                })
            ];
        };
        const result = await admRepository.listAllUsers();
        node_assert_1.default.deepStrictEqual(result, expected);
    });
    (0, node_test_1.it)("should return an empty array if there are no users", async () => {
        admRepository.listAllUsers = async () => {
            return [];
        };
        const result = await admRepository.listAllUsers();
        const expected = [];
        node_assert_1.default.deepStrictEqual(result, expected);
    });
    (0, node_test_1.it)("should return an exception if an unexpected error occurs", () => {
        admRepository.listAllUsers = async () => {
            throw new Error("Database connection error");
        };
        node_assert_1.default.rejects(async () => {
            await admRepository.listAllUsers();
        }, {
            message: "Database connection error"
        });
    });
});
