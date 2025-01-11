/* eslint-disable indent */
/* eslint-disable max-len */
import {DocumentData, Firestore} from "firebase-admin/firestore";
import {HttpServer} from "../repositories/http-services";
import {UserRepository} from "../repositories/user-repository";
import {AdminRespository} from "../repositories/adm-repository";
import {PlantRespository} from "../repositories/plant-repository";
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
  getRepository<T extends DocumentData>(type: string): HttpServer<T> {
    switch (type) {
      case "user":
        return UserRepository.create(this.db) as unknown as HttpServer<T>;
      case "admin":
        return AdminRespository.create(this.db) as unknown as HttpServer<T>;
      case "plant":
        return PlantRespository.create(this.db) as unknown as HttpServer<T>;
      default:
        throw new Error(`Unknown repository type: ${type}`);
    }
  }
}
