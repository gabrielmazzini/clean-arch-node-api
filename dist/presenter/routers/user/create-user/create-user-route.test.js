"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const node_crypto_1 = __importDefault(require("node:crypto"));
const httpMocks = __importStar(require("node-mocks-http"));
const create_user_express_router_1 = require("./create-user-express-router");
const UserEntity_1 = require("../../../../domain/entity/user/UserEntity");
(0, node_test_1.describe)("#Create user route", () => {
    const idFixed = "5c484254-c10c-43e6-b252-fcbe2a42c90e";
    const createUserUsecaseMock = {
        execute: async ({ name, lastName, birthdate, cpf, email, address, typeUser }) => {
            const user = UserEntity_1.User.create({ name, lastName, birthdate, cpf, email, address, typeUser });
            return {
                message: "Create User Success",
                id: user.id,
            };
        }
    };
    (0, node_test_1.before)(() => {
        node_crypto_1.default.randomUUID = () => idFixed;
    });
    (0, node_test_1.after)(async () => {
        node_crypto_1.default.randomUUID = (await (Promise.resolve().then(() => __importStar(require("node:crypto"))))).randomUUID;
    });
    let route;
    (0, node_test_1.beforeEach)(() => {
        route = create_user_express_router_1.CreateUserRoute.create(createUserUsecaseMock);
    });
    (0, node_test_1.it)("should return an object with message and id if user creation is successful", async () => {
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/user',
            body: {
                name: 'John',
                lastName: 'Doe',
                birthdate: '1990-01-01',
                cpf: '405.967.938-04',
                email: 'john.doe@example.com',
                address: {
                    street: 'Rua Exemplo',
                    numberHome: '123',
                    district: 'Centro',
                    state: 'SP',
                    city: 'São Paulo',
                    country: 'Brasil',
                },
                typeUser: 'admin',
            }
        });
        const res = httpMocks.createResponse();
        const handler = route.getHandler();
        await handler(req, res);
        node_assert_1.default.strictEqual(res.statusCode, 201);
        const data = res._getData();
        const expected = {
            message: "Create User Success",
            id: "5c484254-c10c-43e6-b252-fcbe2a42c90e"
        };
        node_assert_1.default.deepStrictEqual(data, JSON.stringify(expected));
    });
    (0, node_test_1.it)("should return 500 for an unexpected error", async () => {
        const createUserUsecaseMock = {
            execute: async () => {
                throw new Error('Unexpected error');
            },
        };
        route = create_user_express_router_1.CreateUserRoute.create(createUserUsecaseMock);
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/user',
            body: {
                name: 'John',
                lastName: 'Doe',
                birthdate: '1990-01-01',
                cpf: '405.967.938-04',
                email: 'john.doe@example.com',
                address: {
                    street: 'Rua Exemplo',
                    numberHome: '123',
                    district: 'Centro',
                    state: 'SP',
                    city: 'São Paulo',
                    country: 'Brasil',
                },
                typeUser: 'admin',
            },
        });
        const res = httpMocks.createResponse();
        const handler = route.getHandler();
        await handler(req, res);
        node_assert_1.default.strictEqual(res.statusCode, 500);
        const data = res._getJSONData();
        node_assert_1.default.strictEqual(data.message, 'Unexpected error');
    });
    (0, node_test_1.it)("should return 400 if one or more fields are invalid", async () => {
        const createUserUsecaseMock = {
            execute: async ({ name, lastName, birthdate, cpf, email, address, typeUser }) => {
                const user = UserEntity_1.User.create({ name, lastName, birthdate, cpf, email, address, typeUser });
                return {
                    message: "Create User Success",
                    id: user.id,
                };
            }
        };
        route = create_user_express_router_1.CreateUserRoute.create(createUserUsecaseMock);
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/user',
            body: {
                lastName: 'Doe',
                birthdate: '1990-01-01',
                cpf: '405.967.938-04',
                email: 'john.doe@example.com',
                address: {
                    street: 'Rua Exemplo',
                    numberHome: '123',
                    district: 'Centro',
                    state: 'SP',
                    city: 'São Paulo',
                    country: 'Brasil',
                },
                typeUser: 'admin',
            },
        });
        const res = httpMocks.createResponse();
        const handler = route.getHandler();
        await handler(req, res);
        node_assert_1.default.strictEqual(res.statusCode, 400);
        const data = res._getData();
        const expected = { name: "name is a required field" };
        node_assert_1.default.strictEqual(data, JSON.stringify(expected));
    });
    (0, node_test_1.it)("should return 400 if birthdate is invalid", async () => {
        const createUserUsecaseMock = {
            execute: async ({ name, lastName, birthdate, cpf, email, address, typeUser }) => {
                const user = UserEntity_1.User.create({ name, lastName, birthdate, cpf, email, address, typeUser });
                return {
                    message: "Create User Success",
                    id: user.id,
                };
            }
        };
        route = create_user_express_router_1.CreateUserRoute.create(createUserUsecaseMock);
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/user',
            body: {
                name: "Joe",
                lastName: 'Doe',
                birthdate: '1231241241241',
                cpf: '405.967.938-04',
                email: 'john.doe@example.com',
                address: {
                    street: 'Rua Exemplo',
                    numberHome: '123',
                    district: 'Centro',
                    state: 'SP',
                    city: 'São Paulo',
                    country: 'Brasil',
                },
                typeUser: 'admin',
            },
        });
        const res = httpMocks.createResponse();
        const handler = route.getHandler();
        await handler(req, res);
        node_assert_1.default.strictEqual(res.statusCode, 400);
        const data = res._getData();
        const expected = { message: "Invalid date format" };
        node_assert_1.default.strictEqual(data, JSON.stringify(expected));
    });
    (0, node_test_1.it)("should return 400 if birthdate is in the future", async () => {
        const createUserUsecaseMock = {
            execute: async ({ name, lastName, birthdate, cpf, email, address, typeUser }) => {
                const user = UserEntity_1.User.create({ name, lastName, birthdate, cpf, email, address, typeUser });
                return {
                    message: "Create User Success",
                    id: user.id,
                };
            }
        };
        route = create_user_express_router_1.CreateUserRoute.create(createUserUsecaseMock);
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/user',
            body: {
                name: "Joe",
                lastName: 'Doe',
                birthdate: '2030-01-01',
                cpf: '405.967.938-04',
                email: 'john.doe@example.com',
                address: {
                    street: 'Rua Exemplo',
                    numberHome: '123',
                    district: 'Centro',
                    state: 'SP',
                    city: 'São Paulo',
                    country: 'Brasil',
                },
                typeUser: 'admin',
            },
        });
        const res = httpMocks.createResponse();
        const handler = route.getHandler();
        await handler(req, res);
        node_assert_1.default.strictEqual(res.statusCode, 400);
        const data = res._getData();
        const expected = { message: "Invalid date of birth" };
        node_assert_1.default.strictEqual(data, JSON.stringify(expected));
    });
    (0, node_test_1.it)("should return 400 if cpf is invalid", async () => {
        const createUserUsecaseMock = {
            execute: async ({ name, lastName, birthdate, cpf, email, address, typeUser }) => {
                const user = UserEntity_1.User.create({ name, lastName, birthdate, cpf, email, address, typeUser });
                return {
                    message: "Create User Success",
                    id: user.id,
                };
            }
        };
        route = create_user_express_router_1.CreateUserRoute.create(createUserUsecaseMock);
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/user',
            body: {
                name: "Joe",
                lastName: 'Doe',
                birthdate: '1990-01-01',
                cpf: '123.234.571-04',
                email: 'john.doe@example.com',
                address: {
                    street: 'Rua Exemplo',
                    numberHome: '123',
                    district: 'Centro',
                    state: 'SP',
                    city: 'São Paulo',
                    country: 'Brasil',
                },
                typeUser: 'admin',
            },
        });
        const res = httpMocks.createResponse();
        const handler = route.getHandler();
        await handler(req, res);
        node_assert_1.default.strictEqual(res.statusCode, 400);
        const data = res._getData();
        const expected = { message: "Invalid CPF" };
        node_assert_1.default.strictEqual(data, JSON.stringify(expected));
    });
    (0, node_test_1.it)("should return 400 if email is invalid", async () => {
        const createUserUsecaseMock = {
            execute: async ({ name, lastName, birthdate, cpf, email, address, typeUser }) => {
                const user = UserEntity_1.User.create({ name, lastName, birthdate, cpf, email, address, typeUser });
                return {
                    message: "Create User Success",
                    id: user.id,
                };
            }
        };
        route = create_user_express_router_1.CreateUserRoute.create(createUserUsecaseMock);
        const req = httpMocks.createRequest({
            method: 'POST',
            url: '/user',
            body: {
                name: "Joe",
                lastName: 'Doe',
                birthdate: '1990-01-01',
                cpf: '405.967.938-04',
                email: 'gabriel@.com',
                address: {
                    street: 'Rua Exemplo',
                    numberHome: '123',
                    district: 'Centro',
                    state: 'SP',
                    city: 'São Paulo',
                    country: 'Brasil',
                },
                typeUser: 'admin',
            },
        });
        const res = httpMocks.createResponse();
        const handler = route.getHandler();
        await handler(req, res);
        node_assert_1.default.strictEqual(res.statusCode, 400);
        const data = res._getData();
        const expected = { message: "Invalid email" };
        node_assert_1.default.strictEqual(data, JSON.stringify(expected));
    });
});
