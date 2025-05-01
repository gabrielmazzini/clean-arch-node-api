/* eslint-disable brace-style */
/* eslint-disable max-len */
/* eslint-disable indent */
import {ErrorPlantNotFound} from "../../../errors/errors";
import {ServiceHttp} from "../../../infra/services/services-http";
import {Usecase} from "../../usecase";
import {IDeleteBarberInputDto, IDeleteBarberOutputDto} from "./delete-barber-dto";
/**
 */
export class DeleteBarberUsecase
  implements Usecase<IDeleteBarberInputDto, IDeleteBarberOutputDto>
{
  /**
   * @param {ServiceHttp} serviceHttp
   */
  private constructor(private serviceHttp: ServiceHttp) {}
  /**
   * @param {ServiceHttp} serviceHttp
   * @return {DeletePlantUsecase}
   */
  public static create(serviceHttp: ServiceHttp): DeleteBarberUsecase {
    return new DeleteBarberUsecase(serviceHttp);
  }
  /**
   * @param {IDeletePlantInputDto} input
   * @return {IDeletePlantOutputDto}
   */
  public async execute(
    input: IDeleteBarberInputDto,
  ): Promise<IDeleteBarberOutputDto> {
    const response = await this.serviceHttp.delete("barber", input.id);
    if (response === false) {
      throw new ErrorPlantNotFound("Plant not found");
    }
    const output = this.presenter();
    return output;
  }
  /**
   * @return {IDeletePlantOutputDto}
   */
  private presenter(): IDeleteBarberOutputDto {
    return {
      status: true,
    };
  }
}
