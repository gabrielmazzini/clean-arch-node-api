/* eslint-disable max-len */
/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable indent */
import {Plant} from "../../../domain/entity/plant/plantEntity";
import {ServiceHttp} from "../../../infra/services/services-http";
import {Usecase} from "../../usecase";
import {IcreatePlantInputDto, IcreatePlantOutputDto} from "./create-plant-dto";

/**
 */
export class CreatePlantUsecase
  implements Usecase<IcreatePlantInputDto, IcreatePlantOutputDto>
{
  /**
   * @param {ServiceHttp} serviceHttp
   */
  private constructor(private serviceHttp: ServiceHttp) {}
  /**
   * @param {ServiceHttp} serviceHttp
   * @return {CreatePlantUsecase}
   */
  public static create(serviceHttp: ServiceHttp) {
    return new CreatePlantUsecase(serviceHttp);
  }
  /**
   * @param {string} scientificName
   * @param {string} popularName
   * @param {string} species
   * @param {string} image
   */
  public async execute({
    scientificName,
    popularName,
    species,
    image,
  }: IcreatePlantInputDto): Promise<IcreatePlantOutputDto> {
    const plant = Plant.create({
      scientificName,
      popularName,
      species,
      image,
    });
    await this.serviceHttp.create("plant", plant);
    const output = this.presenter(plant);
    return output;
  }
  /**
   * @param {Plant} plant
   * @return {IcreatePlantOutputDto}
   */
  private presenter(plant: Plant): IcreatePlantOutputDto {
    const output: IcreatePlantOutputDto = {
      id: plant._id,
      message: "Create Plant Sucess",
    };
    return output;
  }
}
