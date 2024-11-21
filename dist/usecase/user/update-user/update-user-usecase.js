"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUsecase = void 0;
const errors_1 = require("../../../errors/errors");
class UpdateUserUsecase {
    userRepository;
    /**
     * @param {IUserRepository} userRepostirory
     */
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    /**
     * @param {IUserRepository} userRepostirory
     * @return {UpdateUser}
     */
    static create(userRepository) {
        return new UpdateUserUsecase(userRepository);
    }
    /**
     * @param {updateUserInputDto} input
     */
    async execute(input) {
        const result = await this.userRepository.updateUser(input);
        if (result === false) {
            throw new errors_1.ErrorUserNotFound("User not found");
        }
        ;
        const output = this.presenter();
        return output;
    }
    ;
    /**
     */
    presenter() {
        return {
            message: "update successfully",
            status: true
        };
    }
    ;
}
exports.UpdateUserUsecase = UpdateUserUsecase;
;
