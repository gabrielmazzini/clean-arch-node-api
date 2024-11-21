/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { User } from "../../../domain/entity/user/UserEntity";
import {IUserRepository} from "../../../domain/repositories/userRepositorie";
import * as Loki from 'lokijs';
import { ErrorUserNotFound } from "../../../errors/errors";
import { updateUserInputDto } from "../../../usecase/user/update-user/update-user-dto";
import { Birthdate } from "../../../domain/objectsValue/Birthdate";
import { CPF } from "../../../domain/objectsValue/Cpf";
import { Email } from "../../../domain/objectsValue/Email";
/**
 */
export class UserRepositoryLokijs implements IUserRepository {
  #schedule
  /**
     * @param {Loki} db
     */
  constructor(db: Loki) {
    this.#schedule = db.addCollection("users");
  };
  /**
   * @param db 
   * @return {UserRepositoryLokijs}
   */
  public static create(db: Loki): UserRepositoryLokijs {
    return new UserRepositoryLokijs(db);
  };
  /**
   * @param {string} id 
   */
  async list(id: string): Promise<User | null> {
    try {
      const user = await this.#schedule.findOne({id});
      if (!user) {
        return null;
      };
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    };
  };
  /**
   * @param {User} data 
   */
  async createUser(data: User): Promise<object> {
    try {
      const {$loki, meta, ...result} = await this.#schedule.insertOne(data);
      return result
    } catch (error: any) {
      throw new Error(error.message);
    };
  };
  /**
   * @param {updateUserInputDto} input 
   */
  async updateUser(input: any): Promise<boolean> {
    const id: string = input.id;
    try {
      const user: User = await this.#schedule.findOne({id});
      if(!user) {
        return false;
      };
      const street = input.address === undefined ? user.address.street : input.address.street;
      const complement = input.address === undefined ? user.address.complement : input.address.complement;
      const numberHome = input.address === undefined ? user.address.numberHome : input.address.numberHome;
      const district = input.address === undefined ? user.address.district : input.address.district;
      const state = input.address === undefined ? user.address.state : input.address.state;
      const city = input.address === undefined ? user.address.city : input.address.city;
      const country = input.address === undefined ? user.address.country : input.address.country;
      const name = input.name === undefined ? user.name : input.name;
      const lastName = input.lastName === undefined ? user.lastName : input.lastName;
      const birthdate = input.birthdate === undefined ? user.birthdate.format() : input.birthdate;
      const cpf = input.cpf === undefined ? user.cpf.value() : input.cpf;
      const email = input.email === undefined ? user.email.value() : input.email;
      this.#schedule.updateWhere(
        (user: User) => user.id === input.id,
        async (user: User) => {
          const userUpdate = {
            ...user,
            id: user.id,
            name: name,
            lastName: lastName,
            birthdate: new Birthdate(birthdate),
            cpf: new CPF(cpf),
            email: new Email(email),
            address: {
                street: street,
                complement: complement,
                numberHome: numberHome,
                district: district,
                state: state,
                city: city,
                country: country,
            },
            typeUser: user.typeUser,
          };
          User.create(userUpdate);
          await this.#schedule.update(userUpdate);
        }
      );
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    };
  };
  /**
   * @param {string} id 
   */
  async deleteUser(id: string): Promise<boolean> {
    try {
      const user = this.#schedule.findOne({id});
      if(!user) {
        return false;
      };
      await this.#schedule.remove(user);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
};

