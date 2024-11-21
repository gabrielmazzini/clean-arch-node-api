import { User } from "../../../domain/entity/user/UserEntity";
import { IUserRepository } from "../../../domain/repositories/userRepositorie";
import { ErrorUserNotFound } from "../../../errors/errors";
import { Usecase } from "../../usecase";
import { updateUserInputDto } from "./update-user-dto";
import { updateUserOutputDto } from "./update-user-dto";

export class UpdateUserUsecase implements Usecase<updateUserInputDto, updateUserOutputDto> {
    /**
     * @param {IUserRepository} userRepostirory
     */
    private constructor(
        private userRepository: IUserRepository
    ){}
    /**
     * @param {IUserRepository} userRepostirory
     * @return {UpdateUser}
     */
    public static create(userRepository: IUserRepository): UpdateUserUsecase {
        return new UpdateUserUsecase(userRepository);
    }
    /**
     * @param {updateUserInputDto} input
     */
    public async execute(input: updateUserInputDto): Promise<updateUserOutputDto> {
        const result = await this.userRepository.updateUser(input);
        if(result === false) {
            throw new ErrorUserNotFound("User not found");
        };
        const output: updateUserOutputDto = this.presenter();
        return output;
    };
    /**
     */
    private presenter(): updateUserOutputDto {
        return {
            message: "update successfully",
            status: true
        };
    };
};