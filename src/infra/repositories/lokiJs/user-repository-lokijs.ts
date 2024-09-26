/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */

import {IUserRepository} from "../../../domain/repositories/userRepositorie";
import {UserModel} from "../../database/models/user-model";
import * as Loki from 'lokijs';
/**
 */
export class UserRepositoryLokijs implements IUserRepository {
  #schedule
  /**
     * @param {Loki} db
     */
  constructor(db: Loki) {
    this.#schedule = db.addCollection("users");
  }
  async list(): Promise<UserModel[]> {
    return this.#schedule.find().map(({meta, $loki, ...result}) => result)
  }
  async create(data: UserModel): Promise<object> {
    const {...result} = this.#schedule.insertOne(data);
    return result
  }
}

