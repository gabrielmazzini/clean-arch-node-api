/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {UserModel} from "../../../infra/database/models/user-model";
import {IUserRepository} from "../../../domain/repositories/userRepositorie";
import {CreateUserInputDto, CreateUserOutputDto} from "./create-user-dto";
import {ErrorUserAlreadyExists} from "../../../presenter/routers/errors";
import {Usecase} from "../../usecase";

/**
 */
export class CreateUserUseCase implements Usecase<CreateUserInputDto, CreateUserOutputDto> {
  /**
     * @param {IMailProvider} mailRepository
     * @param {IUserRepository} userRepostirory
     */
  private constructor(
        private userRepostirory: IUserRepository,
  ) {}
  /**
   * @param {IUserRepository} userRepostirory
   * @param {IMailProvider} mailRepository
   * @return {void}
   */
  public static create(userRepostirory: IUserRepository) {
    return new CreateUserUseCase(userRepostirory);
  }
  /**
   * @param {ICreateUserRequestDTO} data
   */
  public async execute({name, email, password}: CreateUserInputDto): Promise<CreateUserOutputDto> {
    const userAlreadyExists = await this.userRepostirory.fyndByEmail(email);
    if (userAlreadyExists != null) {
      throw new ErrorUserAlreadyExists("User already exists");
    }
    const user = UserModel.create(name, email, password);
    await this.userRepostirory.save(user);
    const output = this.presentOutput(user);
    return output;
  }
  /**
   * @param {User} user
   * @return {CreateUserOutputDto}
   */
  private presentOutput(user: UserModel): CreateUserOutputDto {
    const output: CreateUserOutputDto = {
      id: user.id,
    };
    return output;
  }
}
