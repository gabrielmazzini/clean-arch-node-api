import { User } from "../../../domain/entity/user/UserEntity";
import { IAdminRepository } from "../../../domain/repositories/admRepositorie";
import { HttpServer } from "../../../service/http-services";
import { Service } from "../../../service/service";

/**
 */
export class AdminRespositoryLokijs extends HttpServer<User> {
    /**
       * @param {Loki} db
       */
    constructor(db: Loki) {
        super(db, "admin");
    }
    /**
     * @param {Loki} db
     * @return {AdminRespositoryLokijs}
     */
    public static create(db: Loki) {
      return new AdminRespositoryLokijs(db);
    };
};