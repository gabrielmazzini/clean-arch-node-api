/* eslint-disable max-len */
/* eslint-disable brace-style */
/* eslint-disable indent */
import {DocumentData} from "firebase-admin/firestore";
import {ServiceHttp} from "../../../../infra/services/services-http";
import {BarberMapper} from "../../../../domain/mappers/barber/barber-mapper";
import {Usecase} from "../../../usecase";
import {
  ReadAllBarbersInputDto,
  ReadAllBarbersOutputDto,
} from "./read-all-barbers-dto";
import {Barber} from "../../../../domain/entities/serviceProvider/serviceProvider-entity";

/**
 */
export class RealAllBarbersUsecase
  implements Usecase<ReadAllBarbersInputDto, ReadAllBarbersOutputDto>
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
    return new RealAllBarbersUsecase(serviceHttp);
  }
  /**
   */
  async execute(): Promise<ReadAllBarbersOutputDto[] | []> {
    const docs = await this.serviceHttp.readAll("barber");
    if (docs === null || docs.length === 0) {
      return [];
    }
    const barbers = docs.map((data: DocumentData) =>
      BarberMapper.toEntity(data.data()),
    );
    const output = this.presenter(barbers);
    return output;
  }
  /**
   * @param {Barber[]} barbers
   * @return {ReadAllBarbersOutputDto}
   */
  private presenter(barbers: Barber[]): ReadAllBarbersOutputDto[] {
    const output = barbers.map((barbers) => {
      return BarberMapper.toDto(barbers);
    });
    return output;
  }
}
