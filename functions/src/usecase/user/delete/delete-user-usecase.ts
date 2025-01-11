/* eslint-disable brace-style */
/* eslint-disable indent */
import {ErrorUserNotFound} from "../../../errors/errors";
import {ServiceHttp} from "../../../service/services-http";
import {Usecase} from "../../usecase";
import {IDeleteInputDto, IDeleteOutputDto} from "./delete-user-dto";
/**
 */
export class DeleteUserUsecase
  implements Usecase<IDeleteInputDto, IDeleteOutputDto>
{
  /**
   * @param {ServiceHttp} serviceHttp
   */
  private constructor(private serviceHttp: ServiceHttp) {}
  /**
   * @param {ServiceHttp} serviceHttp
   * @return {DeleteUserUsecase}
   */
  public static create(serviceHttp: ServiceHttp): DeleteUserUsecase {
    return new DeleteUserUsecase(serviceHttp);
  }
  /**
   * @param {IDeleteInputDto} input
   */
  public async execute(input: IDeleteInputDto): Promise<IDeleteOutputDto> {
    const response = await this.serviceHttp.delete("user", input.id);
    if (response === false) {
      throw new ErrorUserNotFound("User not found");
    }
    const outuput = this.presenter();
    return outuput;
  }
  /**
   * @return {IDeleteOutputDto}
   */
  private presenter(): IDeleteOutputDto {
    return {
      message: "delete successfully",
      status: true,
    };
  }
}
