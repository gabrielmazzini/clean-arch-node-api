import { User } from "../../../domain/entity/user/UserEntity";
import { Birthdate } from "../../../domain/objectsValue/Birthdate";
import { CPF } from "../../../domain/objectsValue/Cpf";
import { Email } from "../../../domain/objectsValue/Email";
import { IUserRepository } from "../../../domain/repositories/userRepositorie";
import { ErrorUserNotFound } from "../../../errors/errors";
import { Service } from "../../../service/service";
import { Usecase } from "../../usecase";
import { updateUserInputDto } from "./update-user-dto";
import { updateUserOutputDto } from "./update-user-dto";

export class UpdateUserUsecase implements Usecase<updateUserInputDto, updateUserOutputDto> {
    /**
     * @param {Service} service
     */
    private constructor(
        private service: Service
    ){}
    /**
     * @param {Service} service
     * @return {UpdateUser}
     */
    public static create(userRepository: Service): UpdateUserUsecase {
        return new UpdateUserUsecase(userRepository);
    }
    /**
     * @param {updateUserInputDto} input
     */
    public async execute(input: updateUserInputDto): Promise<updateUserOutputDto> {
        const result = await this.service.update("user", input, User);
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