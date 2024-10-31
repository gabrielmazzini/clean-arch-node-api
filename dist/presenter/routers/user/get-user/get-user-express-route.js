"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersRoute = void 0;
const routes_1 = require("../../routes");
const errors_1 = require("../../../../errors/errors");
/**
 */
class GetUsersRoute {
    path;
    httpMethod;
    getUserUsecase;
    /**
       * @param {string} path
       * @param {HttpMethod} httpMethod
       * @param {GetUserUsecase} getUserUsecase
       */
    constructor(path, httpMethod, getUserUsecase) {
        this.path = path;
        this.httpMethod = httpMethod;
        this.getUserUsecase = getUserUsecase;
    }
    /**
     * @param {GetUserUsecase} getUserUsecase
     * @return {GetUsersRoute}
     */
    static create(getUserUsecase) {
        return new GetUsersRoute("/user/:id", routes_1.HttpMethod.GET, getUserUsecase);
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
                const output = await this.getUserUsecase.execute({ id: id });
                return res.status(200).json(output);
            }
            catch (error) {
                if (error instanceof errors_1.ErrorUserNotFound) {
                    return res.status(404).json({ message: error.message }).send();
                }
                return res.status(500).json({ message: error.message }).send();
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
