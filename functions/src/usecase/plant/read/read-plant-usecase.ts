/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable brace-style */
/* eslint-disable indent */
/* eslint-disable max-len */
import {ErrorPlantNotFound} from "../../../errors/errors";
import {Usecase} from "../../usecase";

import {IReadPlantInputDto, IReadPlantOutputDto} from "./read-plant-dto";
import {Plant} from "../../../domain/entity/plant/plantEntity";
import {PlantMapper} from "../../../domain/mappers/plant/plant-mapper";
import {ServiceHttp} from "../../../infra/services/services-http";
/**
 */
export class ReadPlantUsecase
  implements Usecase<IReadPlantInputDto, IReadPlantOutputDto>
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
    return new ReadPlantUsecase(serviceHttp);
  }
  /**
   * @param {IReadPlantInputDto} input
   */
  async execute(input: IReadPlantInputDto): Promise<IReadPlantOutputDto> {
    const data = await this.serviceHttp.read("plant", input.id);
    if (data === null) {
      throw new ErrorPlantNotFound("Plant not found");
    }
    const plant: Plant = PlantMapper.toEntity(data);
    const output = this.presenter(plant);
    return output;
  }
  /**
   * @param {Plant} plant
   * @return {IReadPlantOutputDto}
   */
  private presenter(plant: Plant): IReadPlantOutputDto {
    const output: IReadPlantOutputDto = PlantMapper.toDto(plant);
    return output;
  }
}
