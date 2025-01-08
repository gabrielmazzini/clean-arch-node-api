/* eslint-disable max-len */
// /* eslint-disable max-len */
// import {describe, after, before, it} from "node:test";
// import assert = require("node:assert");
// import {ApiExpress} from "../infra/api/express/api-express";
// import {UserRepositoryLokijs} from "../infra/repositories/lokiJs/user-repository-lokijs";
// import {CreateUserUsecase} from "../usecase/user/create-user/create-user-usecase";
// import {CreateUserRoute} from "../presenter/routers/user/create-user/create-user-express-router";
// import {GetUserUsecase} from "../usecase/user/list-user/list-user-usecase";
// import {GetUsersRoute} from "../presenter/routers/user/get-user/get-user-express-route";
// import {UpdateUserUsecase} from "../usecase/user/update-user/update-user-usecase";
// import {UpdateUserRoute} from "../presenter/routers/user/update-user/update-user-router-express";
// import {DeleteUserUsecase} from "../usecase/user/delete-user/delete-user-usecase";
// import {DeleteUserRoute} from "../presenter/routers/user/delete-user/delete-user-express-route";
// import {AdminRespositoryLokijs} from "../infra/repositories/lokiJs/adm-repository-loki";
// import {GetAllUsersUsecase} from "../usecase/adm/listAllUsers/listAllUsersUsecase";
// import {GetAllUsersRoute} from "../presenter/routers/adm/list-all-users/list-all-users-route";
// import {Database} from "../infra/database/lokijs/database";
// import {data, data2} from "../infra/database/lokijs/dados";
// // import {Express} from "express";

// describe("#API Workflow", () => {
//   const BASE_URL = "http://localhost/3000";
//   const databaseInstance = Database.getInstance();
//   const userRepositoryLokijs = new UserRepositoryLokijs(databaseInstance);
//   const createUserUseCase = CreateUserUsecase.create(userRepositoryLokijs);
//   const createRoute = CreateUserRoute.create(createUserUseCase);
//   const getUserUsecase = GetUserUsecase.create(userRepositoryLokijs);
//   const getUserRoute = GetUsersRoute.create(getUserUsecase);
//   const updateUserUseCase = UpdateUserUsecase.create(userRepositoryLokijs);
//   const updateRoute = UpdateUserRoute.create(updateUserUseCase);
//   const deleteUserUsecase = DeleteUserUsecase.create(userRepositoryLokijs);
//   const deleteUserRoute = DeleteUserRoute.create(deleteUserUsecase);

//   const adminRepositoryLokijs = new AdminRespositoryLokijs(databaseInstance);
//   const listAllUsersUsecase = GetAllUsersUsecase.create(adminRepositoryLokijs);
//   const getAllUsersRoute = GetAllUsersRoute.create(listAllUsersUsecase);

//   const database = Database.create(createUserUseCase, listAllUsersUsecase);

//   const api = ApiExpress.create([
//     createRoute,
//     getUserRoute,
//     getAllUsersRoute,
//     updateRoute,
//     deleteUserRoute,
//   ]);
//   database.init(data2, data);

//   let _server: any;
//   const _app = api.getApp();
//   before(async () => {
//     _server = _app.listen(3000);
//     await new Promise((resolve) => _app.once("lestening", resolve));
//   });

//   after(() => _server.close());

//   it("should return all users", async () => {
//     const result = await fetch(`${BASE_URL}/user`, {
//       method: "GET",
//     });
//     assert.strictEqual(result.status, 200);
//   });
// });
