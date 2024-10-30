import { User } from "../../../domain/entity/user/UserEntity";
import { IAdminRepository } from "../../../domain/repositories/admRepositorie";

/**
 */
export class AdminRespositoryLokijs implements IAdminRepository {
    #schedule
    /**
       * @param {Loki} db
       */
    constructor(db: Loki) {
        this.#schedule = db.getCollection("users");
    }
    /**
     * @param {Loki} db
     * @return {AdminRespositoryLokijs}
     */
    public static create(db: Loki) {
      return new AdminRespositoryLokijs(db);
    }
    /**
     */
    async listAllUsers(): Promise<User[] | []> {
        try {
            const users = this.#schedule.find().map(({ meta, $loki, ...result }) => {
                return User.with({
                    id: result._id,
                    name: result._name,
                    lastName: result._lastName,
                    birthdate: result._birthdate,
                    cpf: result._cpf,
                    email: result._email,
                    address: result._address,
                    typeUser: result._typeUser
                });
            });
            if(users.length === 0) {
                return [];
            }
            return users;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}