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
const node_crypto_1 = __importDefault(require("node:crypto"));
const node_assert_1 = __importDefault(require("node:assert"));
const Birthdate_1 = require("../../objectsValue/Birthdate");
const Cpf_1 = require("../../objectsValue/Cpf");
const Email_1 = require("../../objectsValue/Email");
const UserEntity_1 = require("./UserEntity");
(0, node_test_1.describe)("User entity", () => {
    (0, node_test_1.describe)("test creating valid user", () => {
        const birthdate = new Birthdate_1.Birthdate('1992-04-02');
        const cpf = new Cpf_1.CPF('935.411.347-80');
        const email = new Email_1.Email('john.doe@example.com');
        const idFixed = "5c484254-c10c-43e6-b252-fcbe2a42c90e";
        (0, node_test_1.before)(() => {
            node_crypto_1.default.randomUUID = () => idFixed;
        });
        (0, node_test_1.after)(async () => {
            node_crypto_1.default.randomUUID = (await (Promise.resolve().then(() => __importStar(require("node:crypto"))))).randomUUID;
        });
        (0, node_test_1.it)("you must create a user", () => {
            const expectedUser = {
                _id: idFixed,
                _name: 'John',
                _lastName: 'Doe',
                _birthdate: birthdate,
                _cpf: cpf,
                _email: email,
                _address: {
                    street: 'Rua das Flores',
                    complement: 'Apt 301',
                    numberHome: '123',
                    district: 'Centro',
                    state: 'SP',
                    city: 'São Paulo',
                    country: 'Brasil',
                },
                _typeUser: 'admin'
            };
            const user = UserEntity_1.User.create({
                name: 'John',
                lastName: 'Doe',
                birthdate: birthdate,
                cpf: cpf,
                email: email,
                address: {
                    street: 'Rua das Flores',
                    complement: 'Apt 301',
                    numberHome: '123',
                    district: 'Centro',
                    state: 'SP',
                    city: 'São Paulo',
                    country: 'Brasil',
                },
                typeUser: 'admin'
            });
            node_assert_1.default.deepEqual(user, expectedUser);
        });
    });
});
