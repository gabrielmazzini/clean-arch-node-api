/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {UserModel} from "../../../infra/database/models/user-model";
import {IUserRepository} from "../../../domain/repositories/userRepositorie";
import {CreateUserInputDto, CreateUserOutputDto} from "./create-user-dto";

/**
 */
export class CreateUserUseCase {
  /**
     * @param {IUserRepository} userRepostirory
     */
  private constructor(
        private userRepostirory: IUserRepository,
  ) {}
  /**
   * @param {IUserRepository} userRepostirory
   * @return {void}
   */
  public static create(userRepostirory: IUserRepository) {
    return new CreateUserUseCase(userRepostirory);
  }
  /**
   * @param {ICreateUserRequestDTO} data
   */
  public async execute({name, lastName, dataNasc, cpf, email, address}: CreateUserInputDto): Promise<any> {
    const user = UserModel.create(name, lastName, dataNasc, cpf,email, address);
    return this.userRepostirory.create(user);
  
  }
}
