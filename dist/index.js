"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
const api_express_1 = require("./infra/api/express/api-express");
const create_user_express_router_1 = require("./presenter/routers/user/create-user/create-user-express-router");
const user_repository_lokijs_1 = require("./infra/repositories/lokiJs/user-repository-lokijs");
const create_user_usecase_1 = require("./usecase/user/create-user/create-user-usecase");
const list_user_usecase_1 = require("./usecase/user/list-user/list-user-usecase");
const get_user_express_route_1 = require("./presenter/routers/user/get-user/get-user-express-route");
const database_1 = require("./infra/database/lokijs/database");
const dados_1 = require("./infra/database/lokijs/dados");
const adm_repository_loki_1 = require("./infra/repositories/lokiJs/adm-repository-loki");
const listAllUsersUsecase_1 = require("./usecase/adm/listAllUsers/listAllUsersUsecase");
const list_all_users_route_1 = require("./presenter/routers/adm/list-all-users/list-all-users-route");
const update_user_usecase_1 = require("./usecase/user/update-user/update-user-usecase");
const update_user_router_express_1 = require("./presenter/routers/user/update-user/update-user-router-express");
// instance database
const databaseInstance = database_1.Database.getInstance();
// user
const userRepositoryLokijs = new user_repository_lokijs_1.UserRepositoryLokijs(databaseInstance);
const createUserUseCase = create_user_usecase_1.CreateUserUseCase.create(userRepositoryLokijs);
const createRoute = create_user_express_router_1.CreateUserRoute.create(createUserUseCase);
const getUserUsecase = list_user_usecase_1.GetUserUsecase.create(userRepositoryLokijs);
const getUserRoute = get_user_express_route_1.GetUsersRoute.create(getUserUsecase);
const updateUserUseCase = update_user_usecase_1.UpdateUserUsecase.create(userRepositoryLokijs);
const updateRoute = update_user_router_express_1.UpdateUserRoute.create(updateUserUseCase);
//adm
const adminRepositoryLokijs = new adm_repository_loki_1.AdminRespositoryLokijs(databaseInstance);
const listAllUsersUsecase = listAllUsersUsecase_1.GetAllUsersUsecase.create(adminRepositoryLokijs);
const getAllUsersRoute = list_all_users_route_1.GetAllUsersRoute.create(listAllUsersUsecase);
//criando o banco de dados
const database = database_1.Database.create(createUserUseCase, listAllUsersUsecase);
const api = api_express_1.ApiExpress.create([
    createRoute,
    getUserRoute,
    getAllUsersRoute,
    updateRoute
]);
database.init(dados_1.data, dados_1.data2);
api.start();
