/* eslint-disable brace-style */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {User} from "../../../domain/entity/user/UserEntity";
import {ServiceHttp} from "../../../infra/services/services-http";
import {Usecase} from "../../usecase";
import {CreateUserInputDto, CreateUserOutputDto} from "./create-user-dto";

/**
 */
export class CreateUserUsecase
  implements Usecase<CreateUserInputDto, CreateUserOutputDto>
{
  /**
   * @param {Service} serviceHttp
   */
  private constructor(private serviceHttp: ServiceHttp) {}
  /**
   * @param {Service} serviceHttp
   * @return {CreateUserUseCase}
   */
  public static create(serviceHttp: ServiceHttp) {
    return new CreateUserUsecase(serviceHttp);
  }
  /**
   * @param {string} name
   * @param {string} lastName
   * @param {Birthdate} birthdate
   * @param {CPF} cpf
   * @param {Email} email
   * @param {string} address
   * @param {string} typeUser
   */
  public async execute({
    name,
    lastName,
    birthdate,
    cpf,
    email,
    address,
    typeUser,
  }: CreateUserInputDto): Promise<CreateUserOutputDto> {
    const user = User.create({
      name,
      lastName,
      birthdate,
      cpf,
      email,
      address,
      typeUser,
    });
    await this.serviceHttp.create("user", user);
    const output = this.presenter(user);
    return output;
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
