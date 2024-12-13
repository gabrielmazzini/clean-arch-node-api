"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const api_express_1 = require("../infra/api/express/api-express");
const user_repository_lokijs_1 = require("../infra/repositories/lokiJs/user-repository-lokijs");
const create_user_usecase_1 = require("../usecase/user/create-user/create-user-usecase");
const create_user_express_router_1 = require("../presenter/routers/user/create-user/create-user-express-router");
const list_user_usecase_1 = require("../usecase/user/list-user/list-user-usecase");
const get_user_express_route_1 = require("../presenter/routers/user/get-user/get-user-express-route");
const update_user_usecase_1 = require("../usecase/user/update-user/update-user-usecase");
const update_user_router_express_1 = require("../presenter/routers/user/update-user/update-user-router-express");
const delete_user_usecase_1 = require("../usecase/user/delete-user/delete-user-usecase");
const delete_user_express_route_1 = require("../presenter/routers/user/delete-user/delete-user-express-route");
const adm_repository_loki_1 = require("../infra/repositories/lokiJs/adm-repository-loki");
const listAllUsersUsecase_1 = require("../usecase/adm/listAllUsers/listAllUsersUsecase");
const list_all_users_route_1 = require("../presenter/routers/adm/list-all-users/list-all-users-route");
const database_1 = require("../infra/database/lokijs/database");
const dados_1 = require("../infra/database/lokijs/dados");
// import {Express} from "express";
(0, node_test_1.describe)("#API Workflow", () => {
    const BASE_URL = "http://localhost/3000";
    const databaseInstance = database_1.Database.getInstance();
    const userRepositoryLokijs = new user_repository_lokijs_1.UserRepositoryLokijs(databaseInstance);
    const createUserUseCase = create_user_usecase_1.CreateUserUsecase.create(userRepositoryLokijs);
    const createRoute = create_user_express_router_1.CreateUserRoute.create(createUserUseCase);
    const getUserUsecase = list_user_usecase_1.GetUserUsecase.create(userRepositoryLokijs);
    const getUserRoute = get_user_express_route_1.GetUsersRoute.create(getUserUsecase);
    const updateUserUseCase = update_user_usecase_1.UpdateUserUsecase.create(userRepositoryLokijs);
    const updateRoute = update_user_router_express_1.UpdateUserRoute.create(updateUserUseCase);
    const deleteUserUsecase = delete_user_usecase_1.DeleteUserUsecase.create(userRepositoryLokijs);
    const deleteUserRoute = delete_user_express_route_1.DeleteUserRoute.create(deleteUserUsecase);
    const adminRepositoryLokijs = new adm_repository_loki_1.AdminRespositoryLokijs(databaseInstance);
    const listAllUsersUsecase = listAllUsersUsecase_1.GetAllUsersUsecase.create(adminRepositoryLokijs);
    const getAllUsersRoute = list_all_users_route_1.GetAllUsersRoute.create(listAllUsersUsecase);
    const database = database_1.Database.create(createUserUseCase, listAllUsersUsecase);
    const api = api_express_1.ApiExpress.create([
        createRoute,
        getUserRoute,
        getAllUsersRoute,
        updateRoute,
        deleteUserRoute
    ]);
    database.init(dados_1.data2, dados_1.data);
    let _server;
    const _app = api.getApp();
    (0, node_test_1.before)(async () => {
        _server = _app.listen(3000);
        await new Promise((resolve) => _app.once("lestening", resolve));
    });
    (0, node_test_1.after)(() => _server.close());
    (0, node_test_1.it)("should return all users", async () => {
        const result = await fetch(`${BASE_URL}/user`, {
            method: "GET",
        });
        node_assert_1.default.strictEqual(result.status, 200);
    });
});
