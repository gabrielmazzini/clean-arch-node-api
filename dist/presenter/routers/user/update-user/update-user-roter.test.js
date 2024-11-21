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
const update_user_router_express_1 = require("./update-user-router-express");
const httpMocks = __importStar(require("node-mocks-http"));
const errors_1 = require("../../../../errors/errors");
(0, node_test_1.describe)("#Update user route", () => {
    const updateUserUsecaseMock = {
        execute: async ({ id }) => {
            if (id === '1') {
                return true;
            }
            ;
            throw new errors_1.ErrorUserNotFound('User not found');
        },
    };
    let route;
    (0, node_test_1.beforeEach)(() => {
        route = update_user_router_express_1.UpdateUserRoute.create(updateUserUsecaseMock);
    });
    (0, node_test_1.it)('should return 200 if successful', async () => {
        const req = httpMocks.createRequest({
            method: 'PUT',
            url: '/user/1',
            params: {
                id: '1',
            },
            body: {
                name: 'John',
                lastName: 'John',
                birthdate: "12/02/1992",
                cpf: "405.967.938-04",
                email: "gabriel@gabriel.com",
            },
        });
        const res = httpMocks.createResponse();
        const handler = route.getHandler();
        await handler(req, res);
        node_assert_1.default.strictEqual(res.statusCode, 200);
        const data = res._getJSONData();
        const expected = true;
        node_assert_1.default.deepStrictEqual(data, expected);
    });
    (0, node_test_1.it)('should return 404 when user is not found', async () => {
        const req = httpMocks.createRequest({
            method: 'PUT',
            url: '/user/2',
            params: {
                id: '2',
            },
            body: {
                name: 'John',
                lastName: 'John',
                birthdate: "12/02/1992",
                cpf: "405.967.938-04",
                email: "gabriel@gabriel.com",
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
        route = update_user_router_express_1.UpdateUserRoute.create(getUserUsecaseErrorMock);
        const req = httpMocks.createRequest({
            method: 'PUT',
            url: '/user/3',
            params: {
                id: '3',
            },
            body: {
                name: 'John',
                lastName: 'John',
                birthdate: "12/02/1992",
                cpf: "405.967.938-04",
                email: "gabriel@gabriel.com",
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
