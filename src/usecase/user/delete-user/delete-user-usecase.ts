import { IUserRepository } from "../../../domain/repositories/userRepositorie";
import { ErrorUserNotFound } from "../../../errors/errors";
import { Usecase } from "../../usecase";
import { IDeleteInputDto, IDeleteOutputDto } from "./delete-user-dto";

export class DeleteUserUsecase implements Usecase<IDeleteInputDto, IDeleteOutputDto> {
    /**
     * @param {IUserRepository} userRepostirory
     */
    private constructor(
        private userRepository: IUserRepository
    ){}
    /**
     * @param {IUserRepository} userRepository
     * @return {DeleteUserUsecase}
     */
    public static create(userRepository: IUserRepository): DeleteUserUsecase {
        return new DeleteUserUsecase(userRepository);
    }
    /**
     * @param {IDeleteInputDto} input
     */
    public async execute(input: IDeleteInputDto): Promise<IDeleteOutputDto> {
        try {
            const response = await this.userRepository.deleteUser(input.id);
            if(response === false) {
                throw new ErrorUserNotFound("User not found");
            };
            return this.presenter();
        } catch (error: any) {
            throw new Error(error.message);
        };
    };
    /**
     * @return {IDeleteOutputDto}
     */
    private presenter(): IDeleteOutputDto {
        return {
            message: "delete successfully",
            status: true,
        };
    };
}