/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable brace-style */
/* eslint-disable indent */
import {UserMapper} from "../../../domain/mappers/user/userMapper";
import {ErrorUserNotFound} from "../../../errors/errors";
import {ServiceHttp} from "../../../infra/services/services-http";
import {Usecase} from "../../usecase";
import {updateUserInputDto, updateUserOutputDto} from "./update-user-dto";
/**
 */
export class UpdateUserUsecase
  implements Usecase<updateUserInputDto, updateUserOutputDto>
{
  /**
   * @param {Service} serviceHttp
   */
  private constructor(private serviceHttp: ServiceHttp) {}
  /**
   * @param {Service} userRepository
   * @return {UpdateUser}
   */
  public static create(userRepository: ServiceHttp): UpdateUserUsecase {
    return new UpdateUserUsecase(userRepository);
  }
  /**
   * @param {updateUserInputDto} input
   */
  public async execute(
    input: updateUserInputDto,
  ): Promise<updateUserOutputDto> {
    const user = UserMapper.toObject(input);
    const result = await this.serviceHttp.update("user", input.id, user);
    if (result === false) {
      throw new ErrorUserNotFound("User not found");
    }
    const output: updateUserOutputDto = this.presenter();
    return output;
  }
  /**
   * @return {object}
   */
  private presenter(): updateUserOutputDto {
    return {
      status: true,
    };
  }
}
