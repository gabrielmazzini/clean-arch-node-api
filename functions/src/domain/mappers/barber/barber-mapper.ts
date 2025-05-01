/* eslint-disable @typescript-eslint/no-explicit-any */
// src/domain/mapper/UserMapper.ts
import serviceProvider from "../../entities/serviceProvider/serviceProvider-entity";
/**
 */
export class BarberMapper {
  /**
   * @param {any} data
   * @return {serviceProvider}
   */
  static toEntity(data: any): serviceProvider {
    return serviceProvider.with({
      id: data.id,
      name: data.name,
      lastName: data.lastName,
      birthdate: data.birthdate,
      cpf: data.cpf,
      email: data.email,
      phone: data.phone,
      bankAccount: data.bankAccount,
      featuredImage: data.featuredImage,
      portfolio: data.portfolio,
      address: data.address,
      reviews: data.reviews,
      typeOfService: data.typeOfService,
      transationsID: data.transationsID,
      companyID: data.companyID,
      openingHours: data.openingHours,
      socialMedia: data.socialMedia,
      createdAt: data.createdAt,
      typeUser: data.typeUser,
    });
  }
  /**
   * @param {serviceProvider} barber
   * @return {object}
   */
  static toDto(serviceProvider: serviceProvider) {
    return {
      id: serviceProvider._id,
      name: serviceProvider._name,
      lastName: serviceProvider._lastName,
      birthdate: serviceProvider._birthdate,
      cpf: serviceProvider._cpf,
      email: serviceProvider._email,
      phone: serviceProvider._phone,
      bankAccount: serviceProvider._bankAccount,
      featuredImage: serviceProvider._featuredImage,
      portfolio: serviceProvider._portfolio,
      address: serviceProvider._address,
      reviews: serviceProvider._reviews,
      typeOfService: serviceProvider._typeOfService,
      transationsID: serviceProvider._transationsID,
      companyID: serviceProvider._companyID,
      openingHours: serviceProvider._openingHours,
      socialMedia: serviceProvider._socialMedia,
      createdAt: serviceProvider._createdAt,
      typeUser: serviceProvider._typeUser,
    };
  }
  /**
   * @param {object} input
   * @return {object}
   */
  static toObject(input: object) {
    const updatedObject: Record<string, any> = {};
    for (const [key, value] of Object.entries(input)) {
      if (value === undefined || key === "id") continue;
      updatedObject[`${key}`] = value;
    }
    return updatedObject;
  }
}
