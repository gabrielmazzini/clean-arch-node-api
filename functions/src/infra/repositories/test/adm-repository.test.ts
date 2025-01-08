// import {describe, it, beforeEach} from "node:test";
// import assert from "node:assert";
// import {AdminRespositoryLokijs} from "../lokiJs/adm-repository-loki";
// import {Database} from "../../database/database";
// import {User} from "../../../domain/entity/user/UserEntity";
// import {Birthdate} from "../../../domain/objectsValue/Birthdate";
// import {CPF} from "../../../domain/objectsValue/Cpf";
// import {Email} from "../../../domain/objectsValue/Email";

// describe("#Adm repository", () => {
//   let db;
//   let admRepository: AdminRespositoryLokijs;

//   beforeEach(() => {
//     db = Database.getInstance();
//     admRepository = AdminRespositoryLokijs.create(db);
//   });

//   it("should return a list of users if they exist", async () => {
//     const expected = [
//       User.with({
//         id: "123",
//         name: "John",
//         lastName: "Doe",
//         birthdate: new Birthdate("1990-01-01"),
//         cpf: new CPF("405.967.938-04"),
//         email: new Email("john.doe@example.com"),
//         address: {
//           street: "Rua Exemplo",
//           numberHome: "123",
//           city: "São Paulo",
//           district: "Centro",
//           state: "SP",
//           country: "Brasil",
//         },
//         typeUser: "admin",
//       }),
//       User.with({
//         id: "123",
//         name: "John",
//         lastName: "Doe",
//         birthdate: new Birthdate("1990-01-01"),
//         cpf: new CPF("405.967.938-04"),
//         email: new Email("john.doe@example.com"),
//         address: {
//           street: "Rua Exemplo",
//           numberHome: "123",
//           city: "São Paulo",
//           district: "Centro",
//           state: "SP",
//           country: "Brasil",
//         },
//         typeUser: "admin",
//       }),
//     ];

//     admRepository.listAllUsers = async () => {
//       return [
//         User.with({
//           id: "123",
//           name: "John",
//           lastName: "Doe",
//           birthdate: new Birthdate("1990-01-01"),
//           cpf: new CPF("405.967.938-04"),
//           email: new Email("john.doe@example.com"),
//           address: {
//             street: "Rua Exemplo",
//             numberHome: "123",
//             city: "São Paulo",
//             district: "Centro",
//             state: "SP",
//             country: "Brasil",
//           },
//           typeUser: "admin",
//         }),
//         User.with({
//           id: "123",
//           name: "John",
//           lastName: "Doe",
//           birthdate: new Birthdate("1990-01-01"),
//           cpf: new CPF("405.967.938-04"),
//           email: new Email("john.doe@example.com"),
//           address: {
//             street: "Rua Exemplo",
//             numberHome: "123",
//             city: "São Paulo",
//             district: "Centro",
//             state: "SP",
//             country: "Brasil",
//           },
//           typeUser: "admin",
//         }),
//       ];
//     };

//     const result = await admRepository.listAllUsers();
//     assert.deepStrictEqual(result, expected);
//   });

//   it("should return an empty array if there are no users", async () => {
//     admRepository.listAllUsers = async () => {
//       return [];
//     };
//     const result = await admRepository.listAllUsers();
//     const expected: [] = [];
//     assert.deepStrictEqual(result, expected);
//   });

//   it("should return an exception if an unexpected error occurs", () => {
//     admRepository.listAllUsers = async () => {
//       throw new Error("Database connection error");
//     };
//     assert.rejects(
//       async () => {
//         await admRepository.listAllUsers();
//       },
//       {
//         message: "Database connection error",
//       },
//     );
//   });
// });
