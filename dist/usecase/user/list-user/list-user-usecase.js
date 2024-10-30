"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserUsecase = void 0;
const errors_1 = require("../../../erros/errors");
/**
 */
class GetUserUsecase {
    #userRepository;
    /**
       * @param {UserRepositoryLokijs} userRepository
       */
    constructor(userRepository) {
        this.#userRepository = userRepository;
    }
    /**
     * @param {UserRepositoryLokijs} userRepository
     * @return {void}
     */
    static create(userRepository) {
        return new GetUserUsecase(userRepository);
    }
    /**
     * @param {GetUserInputDto} input
     */
    async execute(input) {
        const user = await this.#userRepository.list(input.id);
        if (user === null) {
            throw new errors_1.ErrorUserNotFound("User not found");
        }
        const output = GetUserUsecase.presenter(user);
        return output;
    }
    /**
     * @param {User} user
     * @return {GetUserOutputDto}
     */
    static presenter(user) {
        const output = {
            id: user.id,
            name: user.name,
            lastName: user.lastName,
            birthdate: user.birthdate.format(),
            cpf: user.cpf.value(),
            email: user.email.value(),
            address: user.address,
            typeUser: user.typeUser
        };
        return output;
    }
}
exports.GetUserUsecase = GetUserUsecase;
