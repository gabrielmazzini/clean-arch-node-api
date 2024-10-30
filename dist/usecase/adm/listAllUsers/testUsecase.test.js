"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = require("node:assert");
const listAllUsersUsecase_1 = require("./listAllUsersUsecase");
const node_test_1 = require("node:test");
const database_1 = require("../../../infra/database/lokijs/database");
const adm_repository_loki_1 = require("../../../infra/repositories/lokiJs/adm-repository-loki");
const UserEntity_1 = require("../../../domain/entity/user/UserEntity");
const Birthdate_1 = require("../../../domain/objectsValue/Birthdate");
const Cpf_1 = require("../../../domain/objectsValue/Cpf");
const Email_1 = require("../../../domain/objectsValue/Email");
(0, node_test_1.describe)('#List all Users', () => {
    let _admRepositorie;
    let _getAllUsersUsecase;
    let users;
    (0, node_test_1.describe)("should return a list of successful users", () => {
        const mockUsers = [
            UserEntity_1.User.with({
                id: "5ba4fe6a-8063-4b49-aaeb-54d5635f3cf3",
                name: "gabriel",
                lastName: "mazzini",
                birthdate: new Birthdate_1.Birthdate("1992/04/02"),
                cpf: new Cpf_1.CPF("405.967.938-04"),
                email: new Email_1.Email("gabriel@gmail.com"),
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
            }),
            UserEntity_1.User.with({
                id: "5ba4fe6a-8063-4b49-aaeb-54d5635f3cf3",
                name: "gabriel",
                lastName: "mazzini",
                birthdate: new Birthdate_1.Birthdate("1992/04/02"),
                cpf: new Cpf_1.CPF("405.967.938-04"),
                email: new Email_1.Email("gabriel@gmail.com"),
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
            })
        ];
        function presenter(user) {
            const output = user.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    birthdate: user.birthdate.format(),
                    cpf: user.cpf.value(),
                    email: user.email.value(),
                    address: user.address,
                    typeUser: user.typeUser
                };
            });
            return output;
        }
        (0, node_test_1.beforeEach)(() => {
            const database = database_1.Database.getInstance();
            _admRepositorie = adm_repository_loki_1.AdminRespositoryLokijs.create(database);
            _admRepositorie.listAllUsers = async () => {
                return mockUsers.map(user => {
                    users = UserEntity_1.User.with(({
                        id: user.id,
                        name: user.name,
                        lastName: user.lastName,
                        birthdate: user.birthdate,
                        cpf: user.cpf,
                        email: user.email,
                        address: {
                            street: user.address.street,
                            numberHome: user.address.numberHome,
                            city: user.address.city,
                            state: user.address.state,
                            district: user.address.district,
                            complement: user.address.complement,
                            country: user.address.country,
                        },
                        typeUser: user.typeUser
                    }));
                    return users;
                });
            };
            _getAllUsersUsecase = listAllUsersUsecase_1.GetAllUsersUsecase.create(_admRepositorie);
        });
        (0, node_test_1.it)("should return a list of users", async () => {
            const listUsers = mockUsers.map((users) => users);
            const expected = presenter(listUsers);
            const result = await _getAllUsersUsecase.execute();
            node_assert_1.strict.deepStrictEqual(result, expected);
        });
    });
    (0, node_test_1.describe)("deve-se retornar null, se não exister usuários", () => {
        (0, node_test_1.beforeEach)(() => {
            const database = database_1.Database.getInstance();
            _admRepositorie = adm_repository_loki_1.AdminRespositoryLokijs.create(database);
            _admRepositorie.listAllUsers = async () => {
                return [];
            };
            _getAllUsersUsecase = listAllUsersUsecase_1.GetAllUsersUsecase.create(_admRepositorie);
        });
        (0, node_test_1.it)("should return empty array if there are no users", async () => {
            const expected = [];
            const result = await _getAllUsersUsecase.execute();
            node_assert_1.strict.deepStrictEqual(result, expected);
        });
    });
    (0, node_test_1.describe)("server error should be returned", () => {
        (0, node_test_1.beforeEach)(() => {
            const database = database_1.Database.getInstance();
            _admRepositorie = adm_repository_loki_1.AdminRespositoryLokijs.create(database);
            _admRepositorie.listAllUsers = async () => {
                throw new Error("database error");
            };
            _getAllUsersUsecase = listAllUsersUsecase_1.GetAllUsersUsecase.create(_admRepositorie);
        });
        (0, node_test_1.it)("server error should be returned", async () => {
            await node_assert_1.strict.rejects(async () => (await _getAllUsersUsecase.execute()));
        });
    });
});
