/* eslint-disable max-len */
/* eslint-disable brace-style */
/* eslint-disable indent */
import {DocumentData} from "firebase-admin/firestore";
import {ServiceHttp} from "../../../../infra/services/services-http";
import {PlantMapper} from "../../../../domain/mappers/plant-mapper";
import {Usecase} from "../../../usecase";
import {
  ReadAllPlantsInputDto,
  ReadAllPlantsOutputDto,
} from "./read-all-plants-dto";
import {Plant} from "../../../../domain/entity/plant/plantEntity";

/**
 */
export class RealAllPlantsUsecase
  implements Usecase<ReadAllPlantsInputDto, ReadAllPlantsOutputDto>
{
  /**
   * @param {Service} serviceHttp
   */
  constructor(private serviceHttp: ServiceHttp) {}
  /**
   * @param {Service} serviceHttp
   * @return {RealAllPlantsUsecase}
   */
  public static create(serviceHttp: ServiceHttp) {
    return new RealAllPlantsUsecase(serviceHttp);
  }
  /**
   */
  async execute(): Promise<ReadAllPlantsOutputDto[] | []> {
    const docs = await this.serviceHttp.readAll("plant");
    if (docs === null || docs.length === 0) {
      return [];
    }
    const plants = docs.map((data: DocumentData) =>
      PlantMapper.toEntity(data.data()),
    );
    const output = this.presenter(plants);
    return output;
  }
  /**
   * @param {Plant[]} plants
   * @return {ReadAllPlantsOutputDto}
   */
  private presenter(plants: Plant[]): ReadAllPlantsOutputDto[] {
    const output = plants.map((plants) => {
      return PlantMapper.toDto(plants);
    });
    return output;
  }
}
