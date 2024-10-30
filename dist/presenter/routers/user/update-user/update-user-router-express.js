"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserRoute = void 0;
const routes_1 = require("../../routes");
const Birthdate_1 = require("../../../../domain/objectsValue/Birthdate");
const Cpf_1 = require("../../../../domain/objectsValue/Cpf");
const Email_1 = require("../../../../domain/objectsValue/Email");
const errors_1 = require("../../../../erros/errors");
/**
 */
class UpdateUserRoute {
    path;
    httpMethod;
    updateUserUsecase;
    /**
       * @param {string} path
       * @param {HttpMethod} httpMethod
       * @param {UpdateUserUsecase} updateUserUsecase
       */
    constructor(path, httpMethod, updateUserUsecase) {
        this.path = path;
        this.httpMethod = httpMethod;
        this.updateUserUsecase = updateUserUsecase;
    }
    /**
     * @param {UpdateUserUsecase} updateUserUsecase
     * @return {GetAllUsersRoute}
     */
    static create(updateUserUsecase) {
        return new UpdateUserRoute("/user/:id", routes_1.HttpMethod.PUT, updateUserUsecase);
    }
    ;
    getHandler() {
        /**
         * @param {Request} req
         * @param {Response} res
         */
        return async (req, res) => {
            const id = req.params.id;
            const input = {
                id: id,
                name: req.body.name,
                lastName: req.body.lastName,
                birthdate: new Birthdate_1.Birthdate(req.body.birthdate),
                cpf: new Cpf_1.CPF(req.body.cpf),
                email: new Email_1.Email(req.body.email),
                address: req.body.address,
                typeUser: req.body.typeUser
            };
            try {
                const output = await this.updateUserUsecase.execute(input);
                return res.status(200).json(output).send();
            }
            catch (error) {
                if (error instanceof errors_1.ErrorUserNotFound) {
                    return res.status(404).json(error).send;
                }
                ;
                return res.status(500).json(error.message).send();
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
    /**
     * @return {HttpMethod}
     */
    getMethod() {
        return this.httpMethod;
    }
}
exports.UpdateUserRoute = UpdateUserRoute;