"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsersRoute = void 0;
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
                if (response.length === 0) {
                    return res.status(200).json(response);
                }
                const output = response;
                return res.status(200).json(output);
            }
            catch (error) {
                return res.status(500).json(error.message);
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
