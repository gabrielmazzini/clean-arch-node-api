/* eslint-disable max-len */
/* eslint-disable brace-style */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable indent */
import {Barber} from "../../../domain/entities/serviceProvider/serviceProvider-entity";
import {ServiceHttp} from "../../../infra/services/services-http";
import {Usecase} from "../../usecase";
import {IcreateBarberInputDto, IcreateBarberOutputDto} from "./create-barber-dto";

/**
 */
export class CreateBarberUsecase
  implements Usecase<IcreateBarberInputDto, IcreateBarberOutputDto>
{
  /**
   * @param {ServiceHttp} serviceHttp
   */
  private constructor(private serviceHttp: ServiceHttp) {}
  /**
   * @param {ServiceHttp} serviceHttp
   * @return {CreateBarberUsecase}
   */
  public static create(serviceHttp: ServiceHttp) {
    return new CreateBarberUsecase(serviceHttp);
  }
  /**
    * @param {string} name
    * @param {string} lastName
    * @param {string} email
    * @param {number} phone
    * @param {string} featuredImage
    * @param {string[]} portfolio
    * @param {string} address
    * @param {number[]} reviews
    * @param {string[]} typeOfService
    * @param {string[]} transationsId
    * @param {string} barbershopId
    * @param {string[]} openingHours
    * @param {string[]} socialMedia
    * @param {string} typeUser
    * @return {Promise<IcreatePlantOutputDto>}
   */
  public async execute({
    name, lastName, email, phone, featuredImage, portfolio, 
    address, reviews, typeOfService, transationsId, barbershopId, 
    openingHours, socialMedia, typeUser
  }: IcreateBarberInputDto): Promise<IcreateBarberOutputDto> {
    const barber = Barber.create({
      name, lastName, email, phone, featuredImage, portfolio,
      address, reviews, typeOfService, transationsId, barbershopId,
      openingHours, socialMedia, typeUser
    });
    await this.serviceHttp.create("barber", barber);
    const output = this.presenter(barber);
    return output;
  }
  /**
   * @param {Barber} barber
   * @return {IcreateBarberOutputDto}
   */
  private presenter(barber: Barber): IcreateBarberOutputDto {
    const output: IcreateBarberOutputDto = {
      id: barber._id,
    };
    return output;
  }
}
