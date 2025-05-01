/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {Firestore} from "firebase-admin/firestore";
import {User} from "../../domain/entities/user/UserEntity";
import {HttpServer} from "./http-services";
/**
 */
export class UserRepository extends HttpServer<User> {
  /**
   * @param {Firestore} db
   */
  constructor(db: Firestore) {
    super(db, "users");
  }
  /**
   * @param {Loki} db
   * @return {UserRepositoryLokijs}
   */
  public static create(db: Firestore): UserRepository {
    return new UserRepository(db);
  }
}
