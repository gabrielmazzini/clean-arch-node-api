import { strict as assert } from 'node:assert';
import { GetAllUsersUsecase } from './listAllUsersUsecase';
import { describe, beforeEach, it } from 'node:test';
import { Database } from '../../../infra/database/lokijs/database';
import { AdminRespositoryLokijs } from '../../../infra/repositories/lokiJs/adm-repository-loki';
import { User } from '../../../domain/entity/user/UserEntity';
import { Birthdate } from '../../../domain/objectsValue/Birthdate';
import { CPF } from '../../../domain/objectsValue/Cpf';
import { Email } from '../../../domain/objectsValue/Email';

describe('#List all Users', () => {
    let _admRepositorie;
    let _getAllUsersUsecase: GetAllUsersUsecase;
    let users: any;

    describe("should return a list of successful users", () => {
            const mockUsers: User[] = [
            User.with({
                id: "5ba4fe6a-8063-4b49-aaeb-54d5635f3cf3",
                name: "gabriel",
                lastName: "mazzini",
                birthdate: new Birthdate("1992/04/02"),
                cpf: new CPF("405.967.938-04"),
                email: new Email("gabriel@gmail.com"),
                address: {
                street: "teste",
                numberHome: "teste1",
                district: "teste1",
                complement: "teste2",
                city: "teste",
                state: "teste",
                country: "teste"
                },
                typeUser: "admin"
            }),
            User.with({
                id: "5ba4fe6a-8063-4b49-aaeb-54d5635f3cf3",
                name: "gabriel",
                lastName: "mazzini",
                birthdate: new Birthdate("1992/04/02"),
                cpf: new CPF("405.967.938-04"),
                email: new Email("gabriel@gmail.com"),
                address: {
                    street: "teste",
                    numberHome: "teste1",
                    district: "teste1",
                    complement: "teste2",
                    city: "teste",
                    state: "teste",
                    country: "teste"
                },
                typeUser: "admin"
                },)
            ];
        
            function presenter (user: User[]) {
            const output = user.map(user => {
                return {
                    id: user.id,
                    name: user.name,
                    lastName: user.lastName,
                    birthdate: user.birthdate.format(),
                    cpf: user.cpf.value(),
                    email: user.email.value(),
                    address: user.address,
                    typeUser: user.typeUser
                }
            });
            return output;
        }
        
            beforeEach(() => {
            const database = Database.getInstance();
            _admRepositorie = AdminRespositoryLokijs.create(database);
        
            _admRepositorie.listAllUsers = async () => {
                return mockUsers.map(user => {
                    users = User.with(({
                        id: user.id,
                        name: user.name,
                        lastName: user.lastName,
                        birthdate: user.birthdate,
                        cpf: user.cpf,
                        email: user.email,
                        address: {
                            street: user.address.street,
                            numberHome: user.address.numberHome,
                            city: user.address.city,
                            state: user.address.state,
                            district: user.address.district,
                            complement: user.address.complement,
                            country: user.address.country,
                        },
                        typeUser: user.typeUser
                    }))
                    return users;
                });
            };
            _getAllUsersUsecase = GetAllUsersUsecase.create(_admRepositorie);
        });
        
            it("should return a list of users", async () => {
            const listUsers = mockUsers.map((users) => users)
            const expected = presenter(listUsers);
            const result = await _getAllUsersUsecase.execute();
            assert.deepStrictEqual(result, expected);
            });      
    });

    describe("deve-se retornar null, se não exister usuários", () => {
        beforeEach(() => {
            const database = Database.getInstance();
            _admRepositorie = AdminRespositoryLokijs.create(database);
        
            _admRepositorie.listAllUsers = async () => {
                return [];
            };
            _getAllUsersUsecase = GetAllUsersUsecase.create(_admRepositorie);
        });

        it("should return empty array if there are no users", async () => {
            const expected:[] = [];
            const result = await _getAllUsersUsecase.execute();
            assert.deepStrictEqual(result, expected);
        });
    });

    describe("server error should be returned", () => {
        beforeEach(() => {
            const database = Database.getInstance();
            _admRepositorie = AdminRespositoryLokijs.create(database);
        
            _admRepositorie.listAllUsers = async () => {
                throw new Error("database error");
            };
            _getAllUsersUsecase = GetAllUsersUsecase.create(_admRepositorie);
        });

        it("server error should be returned", async () => {
            await assert.rejects(async () => (await _getAllUsersUsecase.execute()));
        });
    });
});
