import {Firestore} from "firebase-admin/firestore";
import {User} from "../../domain/entity/user/UserEntity";
import {HttpServer} from "./http-services";
/**
 */
export class AdminRespository extends HttpServer<User> {
  /**
   * @param {Firestore} db
   */
  constructor(db: Firestore) {
    super(db, "admin");
  }
  /**
   * @param {Loki} db
   * @return {AdminRespositoryLokijs}
   */
  public static create(db: Firestore) {
    return new AdminRespository(db);
  }
}
