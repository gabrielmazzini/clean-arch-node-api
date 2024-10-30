"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsersRoute = void 0;
const errors_1 = require("../../../../erros/errors");
const routes_1 = require("../../routes");
/**
 */
class GetAllUsersRoute {
    path;
    httpMethod;
    getAllUsersUsecase;
    /**
       * @param {string} path
       * @param {HttpMethod} httpMethod
       * @param {GetAllUsersUsecase} getAllUsersUsecase
       */
    constructor(path, httpMethod, getAllUsersUsecase) {
        this.path = path;
        this.httpMethod = httpMethod;
        this.getAllUsersUsecase = getAllUsersUsecase;
    }
    /**
     * @param {GetAllUsersUsecase} getAllUsersUsecase
     * @return {GetAllUsersRoute}
     */
    static create(getAllUsersUsecase) {
        return new GetAllUsersRoute("/user", routes_1.HttpMethod.GET, getAllUsersUsecase);
    }
    /**
     * @param {Response} res
     * @return {Promise}
     */
    getHandler() {
        /**
           * @param {Request} req
           * @param {Response} res
           */
        return async (req, res) => {
            try {
                const response = await this.getAllUsersUsecase.execute();
                if (response === null) {
                    throw new errors_1.ErrorUserNotFound("User not found");
                }
                const output = response;
                res.status(200).json(output);
            }
            catch (error) {
                if (error instanceof errors_1.ErrorNoUsersCollection) {
                    res.status(404).json(error.message);
                }
                res.status(500).json(error.message);
            }
        };
    }
    /**
     * @return {string}
     */
    getPath() {
        return this.path;
    }
    /**
     * @return {HttpMethod}
     */
    getMethod() {
        return this.httpMethod;
    }
}
exports.GetAllUsersRoute = GetAllUsersRoute;
