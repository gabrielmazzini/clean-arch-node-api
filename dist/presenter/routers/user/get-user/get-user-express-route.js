"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersRoute = void 0;
const routes_1 = require("../../routes");
const errors_1 = require("../../../../erros/errors");
/**
 */
class GetUsersRoute {
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
        return new GetUsersRoute("/user/:id", routes_1.HttpMethod.GET, getAllUsersUsecase);
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
            const id = req.params.id;
            try {
                const output = await this.getAllUsersUsecase.execute({ id: id });
                res.status(200).json(output);
            }
            catch (error) {
                if (error instanceof errors_1.ErrorUserNotFound) {
                    res.status(404).json({ message: error.message }).send();
                }
                else {
                    res.status(500).json({ message: error.message }).send();
                }
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
exports.GetUsersRoute = GetUsersRoute;
