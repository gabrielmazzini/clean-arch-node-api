/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable brace-style */
/* eslint-disable indent */
import {PlantMapper} from "../../../domain/mappers/plant-mapper";
import {ErrorPlantNotFound} from "../../../errors/errors";
import {ServiceHttp} from "../../../service/services-http";
import {Usecase} from "../../usecase";
import {IUpdatePlantInputDto, updatePlantOutputDto} from "./update-plant-dto";
/**
 */
export class UpdatePlantUsecase
  implements Usecase<IUpdatePlantInputDto, updatePlantOutputDto>
{
  /**
   * @param {Service} serviceHttp
   */
  private constructor(private serviceHttp: ServiceHttp) {}
  /**
   * @param {Service} serviceHttp
   * @return {UpdateUser}
   */
  public static create(serviceHttp: ServiceHttp): UpdatePlantUsecase {
    return new UpdatePlantUsecase(serviceHttp);
  }
  /**
   * @param {IUpdatePlantInputDto} input
   */
  public async execute(
    input: IUpdatePlantInputDto,
  ): Promise<updatePlantOutputDto> {
    const plant = PlantMapper.toObject(input);
    const result = await this.serviceHttp.update("plant", input.id, plant);
    if (result === false) {
      throw new ErrorPlantNotFound("Plant not found");
    }
    const output: updatePlantOutputDto = this.presenter();
    return output;
  }
  /**
   * @return {object}
   */
  private presenter(): updatePlantOutputDto {
    return {
      message: "update successfully",
      status: true,
    };
  }
}
