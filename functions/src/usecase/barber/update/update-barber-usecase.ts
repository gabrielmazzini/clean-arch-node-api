/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable brace-style */
/* eslint-disable indent */
import {BarberMapper} from "../../../domain/mappers/barber/barber-mapper";
import {ErrorPlantNotFound} from "../../../errors/errors";
import {ServiceHttp} from "../../../infra/services/services-http";
import {Usecase} from "../../usecase";
import {IUpdateBarberInputDto, updateBarberOutputDto} from "./update-barber-dto";
/**
 */
export class UpdateBarberUsecase
  implements Usecase<IUpdateBarberInputDto, updateBarberOutputDto>
{
  /**
   * @param {Service} serviceHttp
   */
  private constructor(private serviceHttp: ServiceHttp) {}
  /**
   * @param {Service} serviceHttp
   * @return {UpdateUser}
   */
  public static create(serviceHttp: ServiceHttp): UpdateBarberUsecase {
    return new UpdateBarberUsecase(serviceHttp);
  }
  /**
   * @param {IUpdatePlantInputDto} input
   */
  public async execute(
    input: IUpdateBarberInputDto,
  ): Promise<updateBarberOutputDto> {
    const barber = BarberMapper.toObject(input);
    const result = await this.serviceHttp.update("barber", input.id, barber);
    if (result === false) {
      throw new ErrorPlantNotFound("Plant not found");
    }
    const output: updateBarberOutputDto = this.presenter();
    return output;
  }
  /**
   * @return {object}
   */
  private presenter(): updateBarberOutputDto {
    return {
      status: true,
    };
  }
}
