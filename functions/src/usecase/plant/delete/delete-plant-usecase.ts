/* eslint-disable brace-style */
/* eslint-disable max-len */
/* eslint-disable indent */
import {ErrorPlantNotFound} from "../../../errors/errors";
import {ServiceHttp} from "../../../infra/services/services-http";
import {Usecase} from "../../usecase";
import {IDeletePlantInputDto, IDeletePlantOutputDto} from "./delete-plant-dto";
/**
 */
export class DeletePlantUsecase
  implements Usecase<IDeletePlantInputDto, IDeletePlantOutputDto>
{
  /**
   * @param {ServiceHttp} serviceHttp
   */
  private constructor(private serviceHttp: ServiceHttp) {}
  /**
   * @param {ServiceHttp} serviceHttp
   * @return {DeletePlantUsecase}
   */
  public static create(serviceHttp: ServiceHttp): DeletePlantUsecase {
    return new DeletePlantUsecase(serviceHttp);
  }
  /**
   * @param {IDeletePlantInputDto} input
   * @return {IDeletePlantOutputDto}
   */
  public async execute(
    input: IDeletePlantInputDto,
  ): Promise<IDeletePlantOutputDto> {
    const response = await this.serviceHttp.delete("plant", input.id);
    if (response === false) {
      throw new ErrorPlantNotFound("Plant not found");
    }
    const output = this.presenter();
    return output;
  }
  /**
   * @return {IDeletePlantOutputDto}
   */
  private presenter(): IDeletePlantOutputDto {
    return {
      status: true,
      message: "delete sucessfully",
    };
  }
}
