"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserRoute = void 0;
const routes_1 = require("../../routes");
const errors_1 = require("../../../../errors/errors");
class DeleteUserRoute {
    path;
    httpMethod;
    deleteUserUsecase;
    /**
     * @param {string} path
     * @param {HttpMethod} httpMethod
     * @param {DeleteUserUsecase} deleteUserUsecase
     */
    constructor(path, httpMethod, deleteUserUsecase) {
        this.path = path;
        this.httpMethod = httpMethod;
        this.deleteUserUsecase = deleteUserUsecase;
    }
    ;
    /**
     * @param {DeleteUserUsecase} deleteUserUsecase
     * @return {DeleteUserRoute}
     */
    static create(deleteUserUsecase) {
        return new DeleteUserRoute("/user/:id", routes_1.HttpMethod.DELETE, deleteUserUsecase);
    }
    ;
    /**
     * @param {Request} req
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
                const output = await this.deleteUserUsecase.execute({ id });
                return res.status(200).json(output).send();
            }
            catch (error) {
                if (error instanceof errors_1.ErrorUserNotFound) {
                    return res.status(404).json({ message: error.message }).send();
                }
                return res.status(500).json({ message: error });
            }
            ;
        };
    }
    ;
    /**
     * @return {string}
     */
    getPath() {
        return this.path;
    }
    ;
    /**
     * @return {HttpMethod}
     */
    getMethod() {
        return this.httpMethod;
    }
    ;
}
exports.DeleteUserRoute = DeleteUserRoute;
;
