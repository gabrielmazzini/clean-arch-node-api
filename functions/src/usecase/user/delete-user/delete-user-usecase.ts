/* eslint-disable brace-style */
/* eslint-disable indent */
import {ErrorUserNotFound} from "../../../errors/errors";
import {Service} from "../../../service/service";
import {Usecase} from "../../usecase";
import {IDeleteInputDto, IDeleteOutputDto} from "./delete-user-dto";
/**
 */
export class DeleteUserUsecase
  implements Usecase<IDeleteInputDto, IDeleteOutputDto>
{
  /**
   * @param {Service} service
   */
  private constructor(private service: Service) {}
  /**
   * @param {Service} service
   * @return {DeleteUserUsecase}
   */
  public static create(service: Service): DeleteUserUsecase {
    return new DeleteUserUsecase(service);
  }
  /**
   * @param {IDeleteInputDto} input
   */
  public async execute(input: IDeleteInputDto): Promise<IDeleteOutputDto> {
    const response = await this.service.delete("user", input.id);
    if (response === false) {
      throw new ErrorUserNotFound("User not found");
    }
    return this.presenter();
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
