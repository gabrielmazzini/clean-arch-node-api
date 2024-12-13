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
import { HttpServer } from "../../../service/http-services";
/**
 */
export class UserRepository extends HttpServer<User> {
  /**
     * @param {Loki} db
     */
  constructor(db: Loki) {
   super(db, "users");
  };
  /**
   * @param db 
   * @return {UserRepositoryLokijs}
   */
  public static create(db: Loki): UserRepository {
    return new UserRepository(db);
  };
};

