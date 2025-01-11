import {Firestore} from "firebase-admin/firestore";
import {HttpServer} from "./http-services";
import {Plant} from "../../domain/entity/plant/plantEntity";
/**
 */
export class PlantRespository extends HttpServer<Plant> {
  /**
   * @param {Firestore} db
   */
  constructor(db: Firestore) {
    super(db, "plant");
  }
  /**
   * @param {Loki} db
   * @return {AdminRespositoryLokijs}
   */
  public static create(db: Firestore) {
    return new PlantRespository(db);
  }
}
