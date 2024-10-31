"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserUsecase = void 0;
const errors_1 = require("../../../errors/errors");
class DeleteUserUsecase {
    userRepository;
    /**
     * @param {IUserRepository} userRepostirory
     */
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    /**
     * @param {IUserRepository} userRepository
     * @return {DeleteUserUsecase}
     */
    static create(userRepository) {
        return new DeleteUserUsecase(userRepository);
    }
    /**
     * @param {IDeleteInputDto} input
     */
    async execute(input) {
        try {
            const response = await this.userRepository.deleteUser(input.id);
            if (response === false) {
                throw new errors_1.ErrorUserNotFound("User not found");
            }
            ;
            return this.presenter();
        }
        catch (error) {
            throw new Error(error.message);
        }
        ;
    }
    ;
    /**
     * @return {IDeleteOutputDto}
     */
    presenter() {
        return {
            message: "delete successfully",
            status: true,
        };
    }
    ;
}
exports.DeleteUserUsecase = DeleteUserUsecase;
