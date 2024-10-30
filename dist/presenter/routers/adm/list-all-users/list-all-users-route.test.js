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
const list_all_users_route_1 = require("./list-all-users-route");
const httpMocks = __importStar(require("node-mocks-http"));
(0, node_test_1.describe)("#Adm route", () => {
    let route;
    (0, node_test_1.describe)("list all users", () => {
        const getAllUsersUsecaseMock = {
            execute: () => {
                return [{
                        id: '1',
                        name: 'John',
                        lastName: 'Doe',
                        birthdate: '1990-01-01',
                        cpf: '123.456.789-00',
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
                    {
                        id: '1',
                        name: 'John',
                        lastName: 'Doe',
                        birthdate: '1990-01-01',
                        cpf: '123.456.789-00',
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
                    }];
            },
        };
        (0, node_test_1.beforeEach)(() => {
            route = list_all_users_route_1.GetAllUsersRoute.create(getAllUsersUsecaseMock);
        });
        (0, node_test_1.it)("should return the user list if it exists", async () => {
            const req = httpMocks.createRequest({
                method: "GET",
                url: "/user",
            });
            const res = httpMocks.createResponse();
            const handler = route.getHandler();
            await handler(req, res);
            node_assert_1.default.strictEqual(res.statusCode, 200);
            const data = res._getJSONData();
            const expected = [
                {
                    id: '1',
                    name: 'John',
                    lastName: 'Doe',
                    birthdate: '1990-01-01',
                    cpf: '123.456.789-00',
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
                {
                    id: '1',
                    name: 'John',
                    lastName: 'Doe',
                    birthdate: '1990-01-01',
                    cpf: '123.456.789-00',
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
            ];
            node_assert_1.default.deepStrictEqual(data, expected);
        });
    });
    (0, node_test_1.describe)("List empty array if users empty", () => {
        const getAllUsersUsecaseMock = {
            execute: () => {
                return [];
            }
        };
        (0, node_test_1.beforeEach)(() => {
            route = list_all_users_route_1.GetAllUsersRoute.create(getAllUsersUsecaseMock);
        });
        (0, node_test_1.it)("should return an empty array if there are no users", async () => {
            const req = httpMocks.createRequest({
                method: "GET",
                url: "/user",
            });
            const res = httpMocks.createResponse();
            const handler = route.getHandler();
            await handler(req, res);
            node_assert_1.default.strictEqual(res.statusCode, 200);
            const data = res._getJSONData();
            const expected = [];
            node_assert_1.default.deepStrictEqual(data, expected);
        });
    });
});
