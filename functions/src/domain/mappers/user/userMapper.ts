/* eslint-disable @typescript-eslint/no-explicit-any */
// src/domain/mapper/UserMapper.ts
import {User} from "../../entities/user/UserEntity";
import {Birthdate} from "../../objectsValue/Birthdate";
import {CPF} from "../../objectsValue/Cpf";
import {Email} from "../../objectsValue/Email";
/**
 */
export class UserMapper {
  /**
   * @param {any} data
   * @return {User}
   */
  static toEntity(data: any): User {
    return User.with({
      id: data.id,
      name: data.name,
      lastName: data.lastName,
      phone: data.phone,
      birthdate: new Birthdate(data.birthdate.date),
      cpf: new CPF(data.cpf.cpf),
      email: new Email(data.email.email),
      creditCard: data.creditCard,
      transationId: data.transationId,
      featuredImage: data.featuredImage,
      geoLocation: data.geoLocation,
      createdAt: data.createdAt,
      typeUser: data.typeUser,
    });
  }
  /**
   * @param {User} user
   * @return {object}
   */
  static toDto(user: User) {
    return {
      id: user._id,
      name: user._name,
      lastName: user._lastName,
      phone: user._phone,
      birthdate: user._birthdate.format(),
      cpf: user._cpf.value(),
      email: user._email.value(),
      creditCard: {
        cardNumber: user._creditCard.cardNumber,
        cvv: user._creditCard.cvv,
        expirationDate: user._creditCard.expirationDate,
        holderName: user._creditCard.holderName,
        holderCpf: user._creditCard.holderCpf.value(),
      },
      transationId: user._transationId,
      featuredImage: user._featuredImage,
      geoLocation: user._geoLocation,
      createdAt: user._createdAt,
      typeUser: user._typeUser,
    };
  }
  /**
   * @param {object} input
   * @return {updatedObject}
   */
  static toObject(input: any) {
    const classMap: {[key: string]: (value: any) => any} = {
      birthdate: (value: any) => new Birthdate(value),
      cpf: (value: any) => new CPF(value),
      email: (value: any) => new Email(value),
    };
    const updatedObject: Record<string, any> = {};
    for (const [key, value] of Object.entries(input)) {
      if (value === undefined || key === "id") continue;
      updatedObject[`${key}`] = classMap[key] ? classMap[key](value) : value;
    }
    return updatedObject;
  }
}
