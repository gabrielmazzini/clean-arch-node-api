"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const UserEntity_1 = require("../../../domain/entity/user/UserEntity");
const lokijs_1 = __importDefault(require("lokijs"));
class Database {
    createUserUseCase;
    getAllUsersUsecase;
    constructor(createUserUseCase, getAllUsersUsecase) {
        this.createUserUseCase = createUserUseCase;
        this.getAllUsersUsecase = getAllUsersUsecase;
    }
    static create(createUserUseCase, getAllUsersUsecase) {
        return new Database(createUserUseCase, getAllUsersUsecase);
    }
    static getInstance() {
        const db = new lokijs_1.default("database", {});
        return db;
    }
    async init(data, data2) {
        try {
            await Promise.all([
                UserEntity_1.User.create({
                    name: data.name,
                    lastName: data.lastName,
                    birthdate: data.birthdate,
                    cpf: data.cpf,
                    email: data.email,
                    address: data.address,
                    typeUser: data.typeUser
                }),
                UserEntity_1.User.create({
                    name: data2.name,
                    lastName: data2.lastName,
                    birthdate: data2.birthdate,
                    cpf: data2.cpf,
                    email: data2.email,
                    address: data2.address,
                    typeUser: data2.typeUser
                }),
            ].map(this.createUserUseCase.execute.bind(this.createUserUseCase)));
            const users = await this.getAllUsersUsecase.execute();
            console.log("users", JSON.stringify(users, null, 2));
        }
        catch (error) {
            console.error("Erro ao inicializar o banco de dados:", error);
        }
    }
}
exports.Database = Database;
