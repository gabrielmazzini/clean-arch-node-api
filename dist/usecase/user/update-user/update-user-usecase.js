"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserUsecase = void 0;
const UserEntity_1 = require("../../../domain/entity/user/UserEntity");
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
        try {
            const currentUser = await this.userRepository.list(input.id);
            if (!currentUser) {
                throw new errors_1.ErrorUserNotFound("User not found");
            }
            ;
            const updateUserData = {
                ...currentUser,
                ...input
            };
            const updateUser = UserEntity_1.User.create(updateUserData);
            await this.userRepository.updateUser(input.id, updateUser);
            const output = this.presenter();
            return output;
        }
        catch (error) {
            throw new Error(error.message);
        }
        ;
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
