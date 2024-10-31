"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUsecase = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
const UserEntity_1 = require("../../../domain/entity/user/UserEntity");
/**
 */
class CreateUserUsecase {
    userRepostirory;
    /**
       * @param {IUserRepository} userRepostirory
       */
    constructor(userRepostirory) {
        this.userRepostirory = userRepostirory;
    }
    /**
     * @param {IUserRepository} userRepostirory
     * @return {CreateUserUseCase}
     */
    static create(userRepostirory) {
        return new CreateUserUsecase(userRepostirory);
    }
    /**
     * @param {ICreateUserRequestDTO}
     */
    async execute({ name, lastName, birthdate, cpf, email, address, typeUser }) {
        try {
            const user = UserEntity_1.User.create({ name, lastName, birthdate, cpf, email, address, typeUser });
            await this.userRepostirory.createUser(user);
            const output = this.presenter(user);
            return output;
        }
        catch (error) {
            throw new Error("Server error: " + error.message);
        }
    }
    /**
     * @param {User} user
     * @return {CreateUserOutputDto}
     */
    presenter(user) {
        const output = {
            message: "Create User Success",
            id: user.id,
        };
        return output;
    }
}
exports.CreateUserUsecase = CreateUserUsecase;
