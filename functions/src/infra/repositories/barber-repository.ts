import {Firestore} from "firebase-admin/firestore";
import {HttpServer} from "./http-services";
import {Barber} from "../../domain/entities/serviceProvider/serviceProvider-entity";
/**
 */
export class BarberRespository extends HttpServer<Barber> {
  /**
   * @param {Firestore} db
   */
  constructor(db: Firestore) {
    super(db, "barber");
  }
  /**
   * @param {Loki} db
   * @return {}
   */
  public static create(db: Firestore) {
    return new BarberRespository(db);
  }
}
