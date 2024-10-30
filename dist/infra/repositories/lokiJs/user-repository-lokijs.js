"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryLokijs = void 0;
const errors_1 = require("../../../erros/errors");
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
    static create(db) {
        return new UserRepositoryLokijs(db);
    }
    ;
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
    async updateUser(id, input) {
        try {
            const user = await this.#schedule.findOne({ id });
            if (!user) {
                throw new errors_1.ErrorUserNotFound("user not found");
            }
            ;
            console.log("user", user);
            const userUpdate = {
                ...user,
                ...input,
                _id: user.id,
            };
            console.log("input", input);
            console.log("merge", userUpdate);
            await this.#schedule.update(userUpdate);
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
        ;
    }
}
exports.UserRepositoryLokijs = UserRepositoryLokijs;
;
