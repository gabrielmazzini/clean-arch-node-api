/* eslint-disable max-len */
import {ApiExpress} from "./infra/api/express/api-express";
import {CreateUserRoute} from "./presenter/routers/user/create/create-user-express-router";
import {CreateUserUsecase} from "./usecase/user/create/create-user-usecase";
import {GetUserUsecase} from "./usecase/user/read/list-user-usecase";
import {GetUsersRoute} from "./presenter/routers/user/read/get-user-express-route";
import {Database} from "./infra/database/database";
import {GetAllUsersUsecase} from "./usecase/adm/user/read/listAllUsersUsecase";
import {GetAllUsersRoute} from "./presenter/routers/adm/user/read/list-all-users-route";
import {UpdateUserUsecase} from "./usecase/user/update/update-user-usecase";
import {UpdateUserRoute} from "./presenter/routers/user/update/update-user-router-express";
import {DeleteUserUsecase} from "./usecase/user/delete/delete-user-usecase";
import {DeleteUserRoute} from "./presenter/routers/user/delete/delete-user-express-route";
import {HttpServer} from "./infra/repositories/http-services";
import {RepositoryFactory} from "./infra/factorys/repository-factory";
import {ServiceHttp} from "./infra/services/services-http";
import * as functions from "firebase-functions";
import {CreatePlantUsecase} from "./usecase/plant/create/create-plant-usecase";
import {CreatePlantRoute} from "./presenter/routers/plant/create/create-plant-express-route";
import {ReadPlantUsecase} from "./usecase/plant/read/read-plant-usecase";
import {ReadPlantRoute} from "./presenter/routers/plant/read/read-plant-express-route";
import {UpdatePlantUsecase} from "./usecase/plant/update/update-plant-usecase";
import {UpdatePlantRoute} from "./presenter/routers/plant/update/update-plant-express-route";
import {DeletePlantUsecase} from "./usecase/plant/delete/delete-plant-usecase";
import {DeletePlantRoute} from "./presenter/routers/plant/delete/delete-plant-express-route";
import {RealAllPlantsUsecase} from "./usecase/adm/plant/read/read-all-plants-usecase";
import {ReadAllPlantsRoute} from "./presenter/routers/adm/plant/read/read-all-plants-express-route";

// criando o banco de dados
const database = new Database();
// instance database
const databaseInstance = Database.getInstance();
const repositoryFactory = new RepositoryFactory(databaseInstance);
database.init();

// user
new HttpServer(databaseInstance, "users");
const userService = new ServiceHttp(repositoryFactory);
const createUserUseCase = CreateUserUsecase.create(userService);
const createRoute = CreateUserRoute.create(createUserUseCase);
const getUserUsecase = GetUserUsecase.create(userService);
const getUserRoute = GetUsersRoute.create(getUserUsecase);
const updateUserUseCase = UpdateUserUsecase.create(userService);
const updateRoute = UpdateUserRoute.create(updateUserUseCase);
const deleteUserUsecase = DeleteUserUsecase.create(userService);
const deleteUserRoute = DeleteUserRoute.create(deleteUserUsecase);

// plant
new HttpServer(databaseInstance, "plants");
const plantService = new ServiceHttp(repositoryFactory);
const createPlantUseCase = CreatePlantUsecase.create(plantService);
const createPlantRoute = CreatePlantRoute.create(createPlantUseCase);
const readPlantUsecase = ReadPlantUsecase.create(plantService);
const readPlantRoute = ReadPlantRoute.create(readPlantUsecase);
const updatePlantUsecase = UpdatePlantUsecase.create(plantService);
const updatePlantRoute = UpdatePlantRoute.create(updatePlantUsecase);
const deletePlantUsecase = DeletePlantUsecase.create(plantService);
const deletePlantRoute = DeletePlantRoute.create(deletePlantUsecase);

// adm
new HttpServer(databaseInstance, "admins");
const admService = new ServiceHttp(repositoryFactory);
const listAllUsersUsecase = GetAllUsersUsecase.create(admService);
const getAllUsersRoute = GetAllUsersRoute.create(listAllUsersUsecase);
const readAllPlantsUsecase = RealAllPlantsUsecase.create(admService);
const readAllPlantsRoute = ReadAllPlantsRoute.create(readAllPlantsUsecase);

const api = ApiExpress.create([
  createRoute,
  getUserRoute,
  getAllUsersRoute,
  updateRoute,
  deleteUserRoute,
  createPlantRoute,
  readPlantRoute,
  updatePlantRoute,
  deletePlantRoute,
  readAllPlantsRoute,
]);
const app = api.getApp();
export const cannabisApp = functions.https.onRequest(app);
