/* eslint-disable max-len */
import {ApiExpress} from "./infra/api/express/api-express";
import {CreateUserRoute} from "./presenter/routers/user/create-user/create-user-express-router";
import {UserRepositoryLokijs} from "./infra/repositories/lokiJs/user-repository-lokijs";
import {CreateUserUsecase} from "./usecase/user/create-user/create-user-usecase";
import {GetUserUsecase} from "./usecase/user/list-user/list-user-usecase";
import {GetUsersRoute} from "./presenter/routers/user/get-user/get-user-express-route";
import {Database} from "./infra/database/lokijs/database";
import {data, data2} from "./infra/database/lokijs/dados";
import { AdminRespositoryLokijs } from "./infra/repositories/lokiJs/adm-repository-loki";
import { GetAllUsersUsecase } from "./usecase/adm/listAllUsers/listAllUsersUsecase";
import { GetAllUsersRoute } from "./presenter/routers/adm/list-all-users/list-all-users-route";
import { UpdateUserUsecase } from "./usecase/user/update-user/update-user-usecase";
import { UpdateUserRoute } from "./presenter/routers/user/update-user/update-user-router-express";
import { DeleteUserUsecase } from "./usecase/user/delete-user/delete-user-usecase";
import { DeleteUserRoute } from "./presenter/routers/user/delete-user/delete-user-express-route";

// instance database
const databaseInstance = Database.getInstance();

// user
const userRepositoryLokijs = new UserRepositoryLokijs(databaseInstance)
const createUserUseCase = CreateUserUsecase.create(userRepositoryLokijs);
const createRoute = CreateUserRoute.create(createUserUseCase);
const getUserUsecase = GetUserUsecase.create(userRepositoryLokijs)
const getUserRoute = GetUsersRoute.create(getUserUsecase);
const updateUserUseCase = UpdateUserUsecase.create(userRepositoryLokijs);
const updateRoute = UpdateUserRoute.create(updateUserUseCase);
const deleteUserUsecase = DeleteUserUsecase.create(userRepositoryLokijs);
const deleteUserRoute = DeleteUserRoute.create(deleteUserUsecase);

//adm
const adminRepositoryLokijs = new AdminRespositoryLokijs(databaseInstance);
const listAllUsersUsecase = GetAllUsersUsecase.create(adminRepositoryLokijs);
const getAllUsersRoute = GetAllUsersRoute.create(listAllUsersUsecase);

//criando o banco de dados
const database = Database.create(createUserUseCase, listAllUsersUsecase);

const api = ApiExpress.create([
  createRoute,
  getUserRoute,
  getAllUsersRoute,
  updateRoute,
  deleteUserRoute
]);
database.init(data, data2)
api.start();



