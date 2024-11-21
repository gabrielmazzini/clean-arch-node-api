"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryLokijs = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
const UserEntity_1 = require("../../../domain/entity/user/UserEntity");
const Birthdate_1 = require("../../../domain/objectsValue/Birthdate");
const Cpf_1 = require("../../../domain/objectsValue/Cpf");
const Email_1 = require("../../../domain/objectsValue/Email");
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
     * @param {updateUserInputDto} input
     */
    async updateUser(input) {
        const id = input.id;
        try {
            const user = await this.#schedule.findOne({ id });
            if (!user) {
                return false;
            }
            ;
            const street = input.address === undefined ? user.address.street : input.address.street;
            const complement = input.address === undefined ? user.address.complement : input.address.complement;
            const numberHome = input.address === undefined ? user.address.numberHome : input.address.numberHome;
            const district = input.address === undefined ? user.address.district : input.address.district;
            const state = input.address === undefined ? user.address.state : input.address.state;
            const city = input.address === undefined ? user.address.city : input.address.city;
            const country = input.address === undefined ? user.address.country : input.address.country;
            const name = input.name === undefined ? user.name : input.name;
            const lastName = input.lastName === undefined ? user.lastName : input.lastName;
            const birthdate = input.birthdate === undefined ? user.birthdate.format() : input.birthdate;
            const cpf = input.cpf === undefined ? user.cpf.value() : input.cpf;
            const email = input.email === undefined ? user.email.value() : input.email;
            this.#schedule.updateWhere((user) => user.id === input.id, async (user) => {
                const userUpdate = {
                    ...user,
                    id: user.id,
                    name: name,
                    lastName: lastName,
                    birthdate: new Birthdate_1.Birthdate(birthdate),
                    cpf: new Cpf_1.CPF(cpf),
                    email: new Email_1.Email(email),
                    address: {
                        street: street,
                        complement: complement,
                        numberHome: numberHome,
                        district: district,
                        state: state,
                        city: city,
                        country: country,
                    },
                    typeUser: user.typeUser,
                };
                UserEntity_1.User.create(userUpdate);
                await this.#schedule.update(userUpdate);
            });
            return true;
        }
        catch (error) {
            throw new Error(error.message);
        }
        ;
    }
    ;
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
    ;
}
exports.UserRepositoryLokijs = UserRepositoryLokijs;
;
