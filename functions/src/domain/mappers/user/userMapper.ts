/* eslint-disable @typescript-eslint/no-explicit-any */
// src/domain/mapper/UserMapper.ts
import {User} from "../../entity/user/UserEntity";
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
      birthdate: new Birthdate(data.birthdate.date),
      cpf: new CPF(data.cpf.cpf),
      email: new Email(data.email.email),
      address: data.address,
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
      birthdate: user._birthdate.format(),
      cpf: user._cpf.value(),
      email: user._email.value(),
      address: user._address,
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
