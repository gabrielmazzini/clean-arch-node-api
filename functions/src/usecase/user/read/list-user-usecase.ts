/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable brace-style */
/* eslint-disable indent */
/* eslint-disable max-len */
import {ErrorUserNotFound} from "../../../errors/errors";
import {Usecase} from "../../usecase";
import {GetUserInputDto, GetUserOutputDto} from "./list-user-dto";
import {ServiceHttp} from "../../../infra/services/services-http";
import {User} from "../../../domain/entity/user/UserEntity";
import {UserMapper} from "../../../domain/mappers/user/user-mapper";
/**
 */
export class GetUserUsecase
  implements Usecase<GetUserOutputDto, GetUserInputDto>
{
  /**
   * @param {Service} serviceHttp
   */
  private constructor(private serviceHttp: ServiceHttp) {}
  /**
   * @param {Service} serviceHttp
   * @return {void}
   */
  public static create(serviceHttp: ServiceHttp) {
    return new GetUserUsecase(serviceHttp);
  }
  /**
   * @param {GetUserInputDto} input
   */
  async execute(input: GetUserInputDto): Promise<GetUserOutputDto> {
    const data = await this.serviceHttp.read("user", input.id);
    if (data === null) {
      throw new ErrorUserNotFound("User not found");
    }
    const user: User = UserMapper.toEntity(data);
    const output = this.presenter(user);
    return output;
  }
  /**
   * @param {User} user
   * @return {GetUserOutputDto}
   */
  private presenter(user: User): GetUserOutputDto {
    const output: GetUserOutputDto = UserMapper.toDto(user);
    return output;
  }
}
