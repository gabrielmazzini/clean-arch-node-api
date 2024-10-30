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
const user_repository_lokijs_1 = require("../../../infra/repositories/lokiJs/user-repository-lokijs");
const create_user_usecase_1 = require("./create-user-usecase");
const database_1 = require("../../../infra/database/lokijs/database");
const Birthdate_1 = require("../../../domain/objectsValue/Birthdate");
const Cpf_1 = require("../../../domain/objectsValue/Cpf");
const Email_1 = require("../../../domain/objectsValue/Email");
const node_assert_1 = __importDefault(require("node:assert"));
(0, node_test_1.describe)("#create user", () => {
    let _userRepository;
    let _createUserUseCase;
    const database = database_1.Database.getInstance();
    const body = {
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
    };
    (0, node_test_1.describe)("you must be able to create a user", () => {
        const idFixed = "5c484254-c10c-43e6-b252-fcbe2a42c90e";
        (0, node_test_1.before)(() => {
            node_crypto_1.default.randomUUID = () => idFixed;
        });
        (0, node_test_1.after)(async () => {
            node_crypto_1.default.randomUUID = (await (Promise.resolve().then(() => __importStar(require("node:crypto"))))).randomUUID;
        });
        (0, node_test_1.beforeEach)(() => {
            _userRepository = user_repository_lokijs_1.UserRepositoryLokijs.create(database);
            _userRepository.createUser = async (user) => {
                return user;
            };
            _createUserUseCase = create_user_usecase_1.CreateUserUseCase.create(_userRepository);
        });
        (0, node_test_1.it)("you must be able to create a user", async () => {
            const expectedOutput = {
                message: "Create User Success",
                id: idFixed
            };
            _userRepository.createUser = async (user) => {
                return { id: user.id };
            };
            const result = await _createUserUseCase.execute(body);
            node_assert_1.default.deepStrictEqual(result, expectedOutput);
        });
    });
    (0, node_test_1.describe)("an exception should be returned if there are errors", () => {
        (0, node_test_1.beforeEach)(() => {
            _userRepository = user_repository_lokijs_1.UserRepositoryLokijs.create(database);
            _userRepository.createUser = async () => {
                throw new Error("Database connection failed");
            };
            _createUserUseCase = create_user_usecase_1.CreateUserUseCase.create(_userRepository);
        });
        (0, node_test_1.it)("an exception should be returned if there are errors", () => {
            node_assert_1.default.rejects(async () => {
                await _createUserUseCase.execute(body);
            }, {
                message: "Server error: Database connection failed"
            });
        });
    });
});
