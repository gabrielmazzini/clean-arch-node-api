/* eslint-disable max-len */
import {ApiExpress} from "./infra/api/express/api-express";
import {CreateUserRoute} from "./presenter/routers/user/create/create-user-express-router";
import {CreateUserUsecase} from "./usecase/user/create/create-user-usecase";
import {GetUserUsecase} from "./usecase/user/read/list-user-usecase";
import {GetUsersRoute} from "./presenter/routers/user/read/get-user-express-route";
import {Database} from "./infra/database/database";
import {GetAllUsersUsecase} from "./usecase/adm/user/read/list-all-users-usecase";
import {GetAllUsersRoute} from "./presenter/routers/adm/user/read/list-all-users-route";
import {UpdateUserUsecase} from "./usecase/user/update/update-user-usecase";
import {UpdateUserRoute} from "./presenter/routers/user/update/update-user-router-express";
import {DeleteUserUsecase} from "./usecase/user/delete/delete-user-usecase";
import {DeleteUserRoute} from "./presenter/routers/user/delete/delete-user-express-route";
import {HttpServer} from "./infra/repositories/http-services";
import {RepositoryFactory} from "./infra/factorys/repository-factory";
import {ServiceHttp} from "./infra/services/services-http";
import * as functions from "firebase-functions";
import {CreateBarberUsecase} from "./usecase/barber/create/create-barber-usecase";
import {CreateBarberRoute} from "./presenter/routers/barber/create/create-barber-express-route";
import {ReadBarberUsecase} from "./usecase/barber/read/read-barber-usecase";
import {ReadPlantRoute} from "./presenter/routers/barber/read/read-barber-express-route";
import {UpdateBarberUsecase} from "./usecase/barber/update/update-barber-usecase";
import {UpdatePlantRoute} from "./presenter/routers/barber/update/update-barber-express-route";
import {DeleteBarberUsecase} from "./usecase/barber/delete/delete-barber-usecase";
import {DeleteBarberRoute} from "./presenter/routers/barber/delete/delete-barber-express-route";
import {RealAllBarbersUsecase} from "./usecase/adm/barber/read/read-all-barbers-usecase";
import {ReadAllBarbersRoute} from "./presenter/routers/adm/barber/read/read-all-barbers-express-route";

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

// barber
new HttpServer(databaseInstance, "barbers");
const barberService = new ServiceHttp(repositoryFactory);
const createBarberUseCase = CreateBarberUsecase.create(barberService);
const createBarberRoute = CreateBarberRoute.create(createBarberUseCase);
const readBarberUsecase = ReadBarberUsecase.create(barberService);
const readBarberRoute = ReadPlantRoute.create(readBarberUsecase);
const updateBarberUsecase = UpdateBarberUsecase.create(barberService);
const updateBarberRoute = UpdatePlantRoute.create(updateBarberUsecase);
const deleteBarberUsecase = DeleteBarberUsecase.create(barberService);
const deleteBarberRoute = DeleteBarberRoute.create(deleteBarberUsecase);

// adm
new HttpServer(databaseInstance, "admins");
const admService = new ServiceHttp(repositoryFactory);
const listAllUsersUsecase = GetAllUsersUsecase.create(admService);
const getAllUsersRoute = GetAllUsersRoute.create(listAllUsersUsecase);
const readAllBarbersUsecase = RealAllBarbersUsecase.create(admService);
const readAllBarbersRoute = ReadAllBarbersRoute.create(readAllBarbersUsecase);

const api = ApiExpress.create([
  createRoute,
  getUserRoute,
  getAllUsersRoute,
  updateRoute,
  deleteUserRoute,
  createBarberRoute,
  readBarberRoute,
  updateBarberRoute,
  deleteBarberRoute,
  readAllBarbersRoute,
]);
const app = api.getApp();
export const eBarberBackend = functions.https.onRequest(app);
