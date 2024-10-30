"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRespositoryLokijs = void 0;
const UserEntity_1 = require("../../../domain/entity/user/UserEntity");
/**
 */
class AdminRespositoryLokijs {
    #schedule;
    /**
       * @param {Loki} db
       */
    constructor(db) {
        this.#schedule = db.getCollection("users");
    }
    /**
     * @param {Loki} db
     * @return {AdminRespositoryLokijs}
     */
    static create(db) {
        return new AdminRespositoryLokijs(db);
    }
    /**
     */
    async listAllUsers() {
        try {
            const users = this.#schedule.find().map(({ meta, $loki, ...result }) => {
                return UserEntity_1.User.with({
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
            if (users.length === 0) {
                return [];
            }
            return users;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.AdminRespositoryLokijs = AdminRespositoryLokijs;
