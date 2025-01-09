/* eslint-disable @typescript-eslint/no-explicit-any */
// src/domain/mapper/UserMapper.ts
import {User} from "../entity/user/UserEntity";
import {Birthdate} from "../objectsValue/Birthdate";
import {CPF} from "../objectsValue/Cpf";
import {Email} from "../objectsValue/Email";
/**
 */
export class UserMapper {
  /**
   * @param {any} data
   * @return {User}
   */
  static toEntity(data: any): User {
    return User.with({
      id: data._id,
      name: data._name,
      lastName: data._lastName,
      birthdate: new Birthdate(data._birthdate._date),
      cpf: new CPF(data._cpf._cpf),
      email: new Email(data._email._email),
      address: data._address,
      typeUser: data._typeUser,
    });
  }
  /**
   * @param {User} user
   * @return {object}
   */
  static toDto(user: User) {
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      birthdate: user.birthdate.format(),
      cpf: user.cpf.value(),
      email: user.email.value(),
      address: user.address,
      typeUser: user.typeUser,
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
      if (value === undefined || key === "_id") continue;
      updatedObject[`_${key}`] = classMap[key] ? classMap[key](value) : value;
    }
    return updatedObject;
  }
}
