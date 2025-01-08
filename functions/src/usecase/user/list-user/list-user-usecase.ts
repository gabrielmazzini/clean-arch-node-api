/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable brace-style */
/* eslint-disable indent */
/* eslint-disable max-len */
import {ErrorUserNotFound} from "../../../errors/errors";
import {Usecase} from "../../usecase";
import {GetUserInputDto, GetUserOutputDto} from "./list-user-dto";
import {Service} from "../../../service/service";

/**
 */
export class GetUserUsecase
  implements Usecase<GetUserOutputDto, GetUserInputDto>
{
  /**
   * @param {Service} service
   */
  private constructor(private service: Service) {}
  /**
   * @param {Service} service
   * @return {void}
   */
  public static create(service: Service) {
    return new GetUserUsecase(service);
  }
  /**
   * @param {GetUserInputDto} input
   */
  async execute(input: GetUserInputDto): Promise<GetUserOutputDto> {
    const user = await this.service.read("user", input.id);
    if (user === null) {
      throw new ErrorUserNotFound("User not found");
    }
    const output = this.presenter(user);
    return output;
  }
  /**
   * @param {User} user
   * @return {GetUserOutputDto}
   */
  private presenter(user: any): GetUserOutputDto {
    const output: GetUserOutputDto = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      birthdate: user.birthdate.format(),
      cpf: user.cpf.value(),
      email: user.email.value(),
      address: user.address,
      typeUser: user.typeUser,
    };
    return output;
  }
}
