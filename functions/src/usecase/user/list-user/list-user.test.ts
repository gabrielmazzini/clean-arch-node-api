/* eslint-disable max-len */
// import {describe, it, beforeEach} from "node:test";
// import assert = require("node:assert");
// import {User} from "../../../domain/entity/user/UserEntity";
// import {Birthdate} from "../../../domain/objectsValue/Birthdate";
// import {CPF} from "../../../domain/objectsValue/Cpf";
// import {Email} from "../../../domain/objectsValue/Email";
// import {GetUserUsecase} from "./list-user-usecase";
// import {Database} from "../../../infra/database/database";
// import {UserRepositoryLokijs} from "../../../infra/repositories/lokiJs/user-repository-lokijs";

// describe("#list for id", () => {
//   let _getUserUsecase: GetUserUsecase;
//   let _userRepository;

//   const mockDatabase = User.with({
//     id: "123",
//     name: "John",
//     lastName: "John",
//     birthdate: new Birthdate("1992/04/02"),
//     cpf: new CPF("405.967.938-04"),
//     email: new Email("gabriel@gmail.com"),
//     address: {
//       street: "John Street",
//       numberHome: "123",
//       district: "centro",
//       complement: "",
//       city: "sp",
//       country: "brasil",
//       state: "sp",
//     },
//     typeUser: "admin",
//   });
//   /**
//    * @param {any} user
//    * @return {object}
//    */
//   function presenter(user: any) {
//     const output = {
//       id: user.id,
//       name: user.name,
//       lastName: user.lastName,
//       birthdate: user.birthdate.format(),
//       cpf: user.cpf.value(),
//       email: user.email.value(),
//       address: user.address,
//       typeUser: user.typeUser,
//     };
//     return output;
//   }

//   describe("must return a user that corresponds to the id sent", () => {
//     beforeEach(() => {
//       const database = Database.getInstance();
//       _userRepository = UserRepositoryLokijs.create(database);
//       _userRepository.list = async (id: string) => {
//         if (id === mockDatabase.id) {
//           return mockDatabase;
//         }
//         return null;
//       };
//       _getUserUsecase = GetUserUsecase.create(_userRepository);
//     });

//     it("must return a user that corresponds to the id sent", async () => {
//       const input = "123";
//       const user = {
//         id: mockDatabase.id,
//         name: mockDatabase.name,
//         lastName: mockDatabase.lastName,
//         birthdate: mockDatabase.birthdate,
//         cpf: mockDatabase.cpf,
//         email: mockDatabase.email,
//         address: mockDatabase.address,
//         typeUser: mockDatabase.typeUser,
//       };
//       const result = await _getUserUsecase.execute({id: input});
//       const expected = presenter(user);
//       assert.deepStrictEqual(expected, result);
//     });
//   });

//   describe("error should be returned if no user is found", () => {
//     beforeEach(() => {
//       const database = Database.getInstance();
//       _userRepository = UserRepositoryLokijs.create(database);
//       _userRepository.list = async (id: string) => {
//         if (id === mockDatabase.id) {
//           return mockDatabase;
//         }
//         return null;
//       };
//       _getUserUsecase = GetUserUsecase.create(_userRepository);
//     });

//     it("error should be returned if no user is found", async () => {
//       const input = "";
//       assert.rejects(
//         async () => {
//           await _getUserUsecase.execute({id: input});
//         },
//         {
//           message: "User not found",
//         },
//       );
//     });
//   });
// });
