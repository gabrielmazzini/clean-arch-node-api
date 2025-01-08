/* eslint-disable brace-style */
/* eslint-disable indent */
import {ErrorUserNotFound} from "../../../errors/errors";
import {Service} from "../../../service/service";
import {Usecase} from "../../usecase";
import {updateUserInputDto, updateUserOutputDto} from "./update-user-dto";
/**
 */
export class UpdateUserUsecase
  implements Usecase<updateUserInputDto, updateUserOutputDto>
{
  /**
   * @param {Service} service
   */
  private constructor(private service: Service) {}
  /**
   * @param {Service} userRepository
   * @return {UpdateUser}
   */
  public static create(userRepository: Service): UpdateUserUsecase {
    return new UpdateUserUsecase(userRepository);
  }
  /**
   * @param {updateUserInputDto} input
   */
  public async execute(
    input: updateUserInputDto,
  ): Promise<updateUserOutputDto> {
    const result = await this.service.update("user", input);
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
      message: "update successfully",
      status: true,
    };
  }
}
