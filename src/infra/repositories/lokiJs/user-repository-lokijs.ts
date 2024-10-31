/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { User } from "../../../domain/entity/user/UserEntity";
import {IUserRepository} from "../../../domain/repositories/userRepositorie";
import * as Loki from 'lokijs';
import { ErrorUserNotFound } from "../../../errors/errors";
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
   * @param {string} id 
   * @param {Partial<User>} input 
   */
  async updateUser(id: string, input: User): Promise<boolean> {
    try {
      const user: User = await this.#schedule.findOne({id});
      if(!user) {
        throw new ErrorUserNotFound("user not found");
      };
      const userInput = {
        id: user.id,
        name: input.name,
        lastName: input.lastName,
        birthdate: input.birthdate,
        cpf: input.cpf,
        email: input.email,
        address: {
          street: input.address.street,
          numberHome: input.address.numberHome,
          district: input.address.district,
          complement: input.address.complement,
          city: input.address.city,
          state: input.address.state,
          country: input.address.country
        },
        typeUser: input.typeUser
      };
      const userUpdate = {
        ...userInput,
        ...user,
      };
      await this.#schedule.update(userUpdate);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    };
  }
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
  }
};

