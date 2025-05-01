/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable brace-style */
/* eslint-disable indent */
/* eslint-disable max-len */
import {ErrorPlantNotFound} from "../../../errors/errors";
import {Usecase} from "../../usecase";

import {IReadBarberInputDto, IReadBarberOutputDto} from "./read-barber-dto";
import {Barber} from "../../../domain/entities/serviceProvider/serviceProvider-entity";
import {BarberMapper} from "../../../domain/mappers/barber/barber-mapper";
import {ServiceHttp} from "../../../infra/services/services-http";
/**
 */
export class ReadBarberUsecase
  implements Usecase<IReadBarberInputDto, IReadBarberOutputDto>
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
    return new ReadBarberUsecase(serviceHttp);
  }
  /**
   * @param {IReadBarberInputDto} input
   */
  async execute(input: IReadBarberInputDto): Promise<IReadBarberOutputDto> {
    const data = await this.serviceHttp.read("barber", input.id);
    if (data === null) {
      throw new ErrorPlantNotFound("Plant not found");
    }
    const barber: Barber = BarberMapper.toEntity(data);
    const output = this.presenter(barber);
    return output;
  }
  /**
   * @param {Barber} barber
   * @return {IReadBarberOutputDto}
   */
  private presenter(barber: Barber): IReadBarberOutputDto {
    const output: IReadBarberOutputDto = BarberMapper.toDto(barber);
    return output;
  }
}
