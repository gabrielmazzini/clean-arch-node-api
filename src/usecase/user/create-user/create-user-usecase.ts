/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {User} from "../../../domain/entity/user/UserEntity";
import {IUserRepository} from "../../../domain/repositories/userRepositorie";
import { Service } from "../../../service/service";
import {Usecase} from "../../usecase";
import {CreateUserInputDto, CreateUserOutputDto} from "./create-user-dto";

/**
 */
export class CreateUserUsecase implements Usecase<CreateUserInputDto, CreateUserOutputDto> {
  /**
     * @param {Service} service
     */
  private constructor(
        private service: Service,
  ) {}
  /**
   * @param {Service} service
   * @return {CreateUserUseCase}
   */
  public static create(service: Service) {
    return new CreateUserUsecase(service);
  }
  /**
   * @param {ICreateUserRequestDTO}
   */
  public async execute({name, lastName, birthdate, cpf, email, address, typeUser}: CreateUserInputDto): Promise<CreateUserOutputDto> {
    const user = User.create({name, lastName, birthdate, cpf,email, address, typeUser});
    await this.service.create("user", user);
    const output = this.presenter(user);
    return output;
  };
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
