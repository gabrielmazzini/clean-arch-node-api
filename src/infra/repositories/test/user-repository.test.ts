import {it, describe, beforeEach} from "node:test";
import assert from "node:assert";
import { UserRepositoryLokijs } from "../lokiJs/user-repository-lokijs";
import * as Loki from "lokijs";
import { Database } from "../../database/lokijs/database";
import { User } from "../../../domain/entity/user/UserEntity";
import { Birthdate } from "../../../domain/objectsValue/Birthdate";
import { CPF } from "../../../domain/objectsValue/Cpf";
import { Email } from "../../../domain/objectsValue/Email";

describe("#User repository", () => {
    let db: Loki
    let userRepository: UserRepositoryLokijs;

    beforeEach(() => {
        db = Database.getInstance();
        userRepository = UserRepositoryLokijs.create(db);
    });

    describe("Create user", () => {
        const user = new User({
            id: "123",
            name: "John",
            lastName: "Doe",
            birthdate: new Birthdate("1990-01-01"),
            cpf: new CPF("405.967.938-04"),
            email: new Email("john.doe@example.com"),
            address: {
                street: "Rua Exemplo",
                numberHome: "123",
                city: "São Paulo",
                district: "Centro",
                state: "SP",
                country: "Brasil"
            },
            typeUser: "admin",
        });
    
        it("should save user if successful", async () => {
            const result = await userRepository.createUser(user);
            assert.deepStrictEqual(result, {
                _id: "123",
                _name: "John",
                _lastName: "Doe",
                _birthdate: new Birthdate("1990-01-01"),
                _cpf: new CPF("405.967.938-04"),
                _email: new Email("john.doe@example.com"),
                _address: {
                    street: "Rua Exemplo",
                    numberHome: "123",
                    city: "São Paulo",
                    district: "Centro",
                    state: "SP",
                    country: "Brasil"
                },
                _typeUser: "admin",
            });
        });

        it("should return an exception if it has an unexpected error", () => {
            userRepository.createUser = async () => {
                throw new Error("Database connection failed")
            }
            assert.rejects(async () => {
                await userRepository.createUser(user);
            },{
                message: "Database connection failed"
            });
        });
    });

    describe("List user", () => {

        it("should return the user if found", async () => {
            userRepository.list = async (id: string) => {
                if(id === "123") {
                    return User.with({
                        id: "123",
                        name: "John",
                        lastName: "Doe",
                        birthdate: new Birthdate("1990-01-01"),
                        cpf: new CPF("405.967.938-04"),
                        email: new Email("john.doe@example.com"),
                        address: {
                            street: "Rua Exemplo",
                            numberHome: "123",
                            city: "São Paulo",
                            district: "Centro",
                            state: "SP",
                            country: "Brasil"
                        },
                        typeUser: "admin",
                    });
                } else {
                    return null
                }
            };
            const id = "123";
            const expected = User.with({
                id: "123",
                name: "John",
                lastName: "Doe",
                birthdate: new Birthdate("1990-01-01"),
                cpf: new CPF("405.967.938-04"),
                email: new Email("john.doe@example.com"),
                address: {
                    street: "Rua Exemplo",
                    numberHome: "123",
                    city: "São Paulo",
                    district: "Centro",
                    state: "SP",
                    country: "Brasil"
                },
                typeUser: "admin",
            });
            const result = await userRepository.list(id);
            assert.deepStrictEqual(result, expected);
        });

        it("should return null if it doesn't find a user", async () => {
            const id = "123";
            userRepository.list = async () => {
                return null;
            };
            const result = await userRepository.list(id);
            const expected = null;
            assert.deepStrictEqual(result, expected);
        });

        it("should return an exception if an unexpected error occurs", async () => {
            const id = "123";
            userRepository.list = async () => {
                throw new Error("Database connection failed")
            }
            assert.rejects(async () => {
                await userRepository.list(id);
            },{
                message: "Database connection failed",
            });
        });
    });
});