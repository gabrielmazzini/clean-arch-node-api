/* eslint-disable max-len */
import {ApiExpress} from "./infra/api/express/api-express";
import {CreateUserRoute} from "./presenter/routers/user/create-user-express-router";
import {UserRepositoryLokijs} from "./infra/repositories/lokiJs/user-repository-lokijs";
import {CreateUserUseCase} from "./usecase/user/create-user/create-user-usecase";
import {GetUserUsecase} from "./usecase/user/list-user/list-user-usecase";
import {GetAllUsersRoute} from "./presenter/routers/user/get-user-express-route";
import {Database} from "./infra/database/lokijs/database";
import {data, data2} from "./infra/database/lokijs/dados";

// instance database
const databaseInstance = Database.getInstance();
// create user
const userRepositoryLokijs = new UserRepositoryLokijs(databaseInstance)
const createUserUseCase = CreateUserUseCase.create(userRepositoryLokijs);
const createRoute = CreateUserRoute.create(createUserUseCase);
const getUserUsecase = GetUserUsecase.create(userRepositoryLokijs)
const getUserRoute = GetAllUsersRoute.create(getUserUsecase);
const database = Database.create(createUserUseCase, getUserUsecase);

const api = ApiExpress.create([
  createRoute,
  getUserRoute,
]);
database.init(data, data2)
api.start();



