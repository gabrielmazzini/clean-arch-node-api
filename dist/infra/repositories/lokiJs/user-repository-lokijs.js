"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryLokijs = void 0;
const errors_1 = require("../../../errors/errors");
/**
 */
class UserRepositoryLokijs {
    #schedule;
    /**
       * @param {Loki} db
       */
    constructor(db) {
        this.#schedule = db.addCollection("users");
    }
    ;
    /**
     * @param db
     * @return {UserRepositoryLokijs}
     */
    static create(db) {
        return new UserRepositoryLokijs(db);
    }
    ;
    /**
     * @param {string} id
     */
    async list(id) {
        try {
            const user = await this.#schedule.findOne({ id });
            if (!user) {
                return null;
            }
            ;
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
        ;
    }
    ;
    /**
     * @param {User} data
     */
    async createUser(data) {
        try {
            const { $loki, meta, ...result } = await this.#schedule.insertOne(data);
            return result;
        }
        catch (error) {
            throw new Error(error.message);
        }
        ;
    }
    ;
    /**
     * @param {string} id
     * @param {Partial<User>} input
     */
    async updateUser(id, input) {
        try {
            const user = await this.#schedule.findOne({ id });
            if (!user) {
                throw new errors_1.ErrorUserNotFound("user not found");
            }
            ;
            const userInput = {
                id: user.id,
                name: input.name,
                lastName: input.lastName,
                birthdate: input.birthdate,
                cpf: input.cpf,
                email: input.email,
                address: {
                    street: input.address.street,
                    numberHome: input.address.numberHome,
                    district: input.address.district,
                    complement: input.address.complement,
                    city: input.address.city,
                    state: input.address.state,
                    country: input.address.country
                },
                typeUser: input.typeUser
            };
            const userUpdate = {
                ...userInput,
                ...user,
            };
            await this.#schedule.update(userUpdate);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
        ;
    }
    /**
     * @param {string} id
     */
    async deleteUser(id) {
        try {
            const user = this.#schedule.findOne({ id });
            if (!user) {
                return false;
            }
            ;
            await this.#schedule.remove(user);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.UserRepositoryLokijs = UserRepositoryLokijs;
;
