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
const update_user_usecase_1 = require("./update-user-usecase");
const user_repository_lokijs_1 = require("../../../infra/repositories/lokiJs/user-repository-lokijs");
const database_1 = require("../../../infra/database/lokijs/database");
const Birthdate_1 = require("../../../domain/objectsValue/Birthdate");
const Cpf_1 = require("../../../domain/objectsValue/Cpf");
const Email_1 = require("../../../domain/objectsValue/Email");
const UserEntity_1 = require("../../../domain/entity/user/UserEntity");
(0, node_test_1.describe)("#Update user", () => {
    let _updateUserUsecase;
    let _userRepository;
    let _db;
    const idFixed = "118a3ec0-ad96-485b-8105-0fddf9759997";
    const mockDatabase = UserEntity_1.User.with({
        id: "118a3ec0-ad96-485b-8105-0fddf9759997",
        name: "gabriel",
        lastName: "ramalho",
        birthdate: new Birthdate_1.Birthdate("02/04/1992"),
        cpf: new Cpf_1.CPF("405.967.938-04"),
        email: new Email_1.Email("gabriel@uon.dev"),
        address: {
            street: "rua 1",
            complement: "casa A",
            numberHome: "441",
            district: "bairro",
            state: "sp",
            city: "sfs",
            country: "brasil",
        },
        typeUser: "adim",
    });
    (0, node_test_1.beforeEach)(() => {
        _db = database_1.Database.getInstance();
        _userRepository = user_repository_lokijs_1.UserRepositoryLokijs.create(_db);
        _userRepository.updateUser = async (input) => {
            if (input.id === mockDatabase.id) {
                return true;
            }
            else {
                return false;
            }
            ;
        };
        _updateUserUsecase = update_user_usecase_1.UpdateUserUsecase.create(_userRepository);
    });
    (0, node_test_1.it)("Must successfully update a user", async () => {
        (0, node_test_1.before)(() => {
            node_crypto_1.default.randomUUID = () => idFixed;
        });
        (0, node_test_1.after)(async () => {
            node_crypto_1.default.randomUUID = (await (Promise.resolve().then(() => __importStar(require("node:crypto"))))).randomUUID;
        });
        const input = {
            id: "118a3ec0-ad96-485b-8105-0fddf9759997",
            name: "teste",
            lastName: "teste last name",
            birthdate: "02/04/1992",
            cpf: "40596793804",
            email: "gabriel@teba.com",
            address: {
                street: "teste2",
                numberHome: "teste1",
                district: "teste1",
                complement: "teste2",
                city: "teste2",
                state: "teste2",
                country: "teste2"
            },
            typeUser: "user",
        };
        const expected = {
            message: "update successfully",
            status: true
        };
        const result = await _updateUserUsecase.execute(input);
        node_assert_1.default.deepStrictEqual(result, expected);
    });
    (0, node_test_1.it)("should return an error if user does not exist", async () => {
        const id = "1-2-3-4-5";
        (0, node_test_1.before)(() => {
            node_crypto_1.default.randomUUID = () => id;
        });
        (0, node_test_1.after)(async () => {
            node_crypto_1.default.randomUUID = (await (Promise.resolve().then(() => __importStar(require("node:crypto"))))).randomUUID;
        });
        const input = {
            id: "123",
            name: "teste",
            lastName: "teste last name",
            birthdate: "02/04/1992",
            cpf: "40596793804",
            email: "gabriel@teba.com",
            address: {
                street: "teste2",
                numberHome: "teste1",
                district: "teste1",
                complement: "teste2",
                city: "teste2",
                state: "teste2",
                country: "teste2"
            },
            typeUser: "user",
        };
        node_assert_1.default.rejects(async () => {
            await _updateUserUsecase.execute(input);
        }, {
            message: "User not found",
        });
    });
    (0, node_test_1.it)("Should return server error", async () => {
        (0, node_test_1.before)(() => {
            _userRepository.updateUser = async () => {
                throw new Error("Server error");
            };
        });
        const input = {
            id: "118a3ec0-ad96-485b-8105-0fddf975999766",
            name: "teste",
            lastName: "teste last name",
            birthdate: "02/04/1992",
            cpf: "40596793804",
            email: "gabriel@teba.com",
            address: {
                street: "teste2",
                numberHome: "teste1",
                district: "teste1",
                complement: "teste2",
                city: "teste2",
                state: "teste2",
                country: "teste2"
            },
            typeUser: "user",
        };
        node_assert_1.default.rejects(async () => {
            await _updateUserUsecase.execute(input);
        }, {
            message: "Server error"
        });
    });
});
