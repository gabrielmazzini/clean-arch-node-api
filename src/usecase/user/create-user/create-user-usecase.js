"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
const user_model_1 = require("../../../infra/database/models/user-model");
const errors_1 = require("../../../presenter/routers/errors");
/**
 */
class CreateUserUseCase {
    /**
       * @param {IMailProvider} mailRepository
       * @param {IUserRepository} userRepostirory
       */
    constructor(userRepostirory) {
        this.userRepostirory = userRepostirory;
    }
    /**
     * @param {IUserRepository} userRepostirory
     * @param {IMailProvider} mailRepository
     * @return {void}
     */
    static create(userRepostirory) {
        return new CreateUserUseCase(userRepostirory);
    }
    /**
     * @param {ICreateUserRequestDTO} data
     */
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            const userAlreadyExists = yield this.userRepostirory.fyndByEmail(email);
            if (userAlreadyExists != null) {
                throw new errors_1.ErrorUserAlreadyExists("User already exists");
            }
            const user = user_model_1.UserModel.create(name, email, password);
            yield this.userRepostirory.save(user);
            const output = this.presentOutput(user);
            return output;
        });
    }
    /**
     * @param {User} user
     * @return {CreateUserOutputDto}
     */
    presentOutput(user) {
        const output = {
            id: user.id,
        };
        return output;
    }
}
exports.CreateUserUseCase = CreateUserUseCase;
