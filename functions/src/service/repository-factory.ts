/* eslint-disable indent */
/* eslint-disable max-len */
import {Firestore} from "firebase-admin/firestore";
import {HttpServer} from "./http-services";
import {UserRepository} from "../infra/repositories/user-repository";
import {AdminRespositoryLokijs} from "../infra/repositories/adm-repository";
/**
 */
export class RepositoryFactory {
  private db: Firestore;
  /**
   * @param {Loki} db
   */
  constructor(db: Firestore) {
    this.db = db;
  }
  /**
   * @param {string} type
   * @return {HttpServer<T>}
   */
  getRepository<T extends {id: string}>(type: string): HttpServer<T> {
    switch (type) {
      case "user":
        return UserRepository.create(this.db) as unknown as HttpServer<T>;
      case "admin":
        return AdminRespositoryLokijs.create(
          this.db,
        ) as unknown as HttpServer<T>;
      default:
        throw new Error(`Unknown repository type: ${type}`);
    }
  }
}
