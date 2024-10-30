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
const get_user_express_route_1 = require("./get-user-express-route");
const httpMocks = __importStar(require("node-mocks-http"));
const errors_1 = require("../../../../erros/errors");
(0, node_test_1.describe)("#Get user route", () => {
    const getUserUsecaseMock = {
        execute: async ({ id }) => {
            if (id === '1') {
                return {
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
                };
            }
            throw new errors_1.ErrorUserNotFound('User not found');
        },
    };
    let route;
    (0, node_test_1.beforeEach)(() => {
        route = get_user_express_route_1.GetUsersRoute.create(getUserUsecaseMock);
    });
    (0, node_test_1.it)('should return 200 and user data when user is found', async () => {
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/user/1',
            params: {
                id: '1',
            },
        });
        const res = httpMocks.createResponse();
        const handler = route.getHandler();
        await handler(req, res);
        node_assert_1.default.strictEqual(res.statusCode, 200);
        const data = res._getJSONData();
        const expected = {
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
        };
        node_assert_1.default.deepStrictEqual(data, expected);
    });
    (0, node_test_1.it)('should return 404 when user is not found', async () => {
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/user/2',
            params: {
                id: '2',
            },
        });
        const res = httpMocks.createResponse();
        const handler = route.getHandler();
        await handler(req, res);
        node_assert_1.default.strictEqual(res.statusCode, 404);
        const data = res._getJSONData();
        node_assert_1.default.strictEqual(data.message, 'User not found');
    });
    (0, node_test_1.it)('should return 500 for an unexpected error', async () => {
        const getUserUsecaseErrorMock = {
            execute: async () => {
                throw new Error('Unexpected error');
            },
        };
        route = get_user_express_route_1.GetUsersRoute.create(getUserUsecaseErrorMock);
        const req = httpMocks.createRequest({
            method: 'GET',
            url: '/user/3',
            params: {
                id: '3',
            },
        });
        const res = httpMocks.createResponse();
        const handler = route.getHandler();
        await handler(req, res);
        node_assert_1.default.strictEqual(res.statusCode, 500);
        const data = res._getJSONData();
        node_assert_1.default.strictEqual(data.message, 'Unexpected error');
    });
});
