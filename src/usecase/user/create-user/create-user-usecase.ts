/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {User} from "../../../domain/entity/user/UserEntity";
import {IUserRepository} from "../../../domain/repositories/userRepositorie";
import {Usecase} from "../../usecase";
import {CreateUserInputDto, CreateUserOutputDto} from "./create-user-dto";

/**
 */
export class CreateUserUsecase implements Usecase<CreateUserInputDto, CreateUserOutputDto> {
  /**
     * @param {IUserRepository} userRepostirory
     */
  private constructor(
        private userRepostirory: IUserRepository,
  ) {}
  /**
   * @param {IUserRepository} userRepostirory
   * @return {CreateUserUseCase}
   */
  public static create(userRepostirory: IUserRepository) {
    return new CreateUserUsecase(userRepostirory);
  }
  /**
   * @param {ICreateUserRequestDTO}
   */
  public async execute({name, lastName, birthdate, cpf, email, address, typeUser}: CreateUserInputDto): Promise<CreateUserOutputDto> {
    try {
      const user = User.create({name, lastName, birthdate, cpf,email, address, typeUser});
      await this.userRepostirory.createUser(user);
      const output = this.presenter(user);
      return output;
    } catch (error: any) {
      throw new Error("Server error: " + error.message);
    }
  }
  /**
   * @param {User} user
   * @return {CreateUserOutputDto}
   */
  private presenter(user: User): CreateUserOutputDto {
    const output: CreateUserOutputDto = {
      message: "Create User Success",
      id: user.id,
    };
    return output;
  }
}
