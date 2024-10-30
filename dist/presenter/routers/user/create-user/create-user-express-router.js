"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserRoute = void 0;
const routes_1 = require("../../routes");
const errors_1 = require("../../../../erros/errors");
const yup = __importStar(require("yup"));
const Cpf_1 = require("../../../../domain/objectsValue/Cpf");
const Birthdate_1 = require("../../../../domain/objectsValue/Birthdate");
const Email_1 = require("../../../../domain/objectsValue/Email");
/**
 */
class CreateUserRoute {
    path;
    method;
    createUserService;
    /**
     * @param {string} path
     * @param {HttpMethod} method
     * @param {CreateUserUseCase} createUserService
       */
    constructor(path, method, createUserService) {
        this.path = path;
        this.method = method;
        this.createUserService = createUserService;
    }
    /**
     * @param {CreateUserUseCase} createUserService
     * @return {CreateUserRoute}
     */
    static create(createUserService) {
        return new CreateUserRoute("/user", routes_1.HttpMethod.POST, createUserService);
    }
    /**
       * @param {Request} req
       * @param {Response} res
       * @return {void}
       */
    getHandler() {
        /**
         * @param {Request} req
         * @param {Response} res
         */
        return async (req, res) => {
            const { name, lastName, birthdate, cpf, email, address: { street, numberHome, city, district, complement, state, country }, typeUser, } = req.body;
            const validateBody = yup.object().shape({
                name: yup.string().required(),
                lastName: yup.string().required(),
                birthdate: yup.string().required(),
                cpf: yup.string().required(),
                email: yup.string().required(),
                address: yup.object({
                    street: yup.string().required(),
                    numberHome: yup.number().required(),
                    city: yup.string().required(),
                    district: yup.string().required(),
                    complement: yup.string(),
                    state: yup.string().required(),
                    country: yup.string().required(),
                }),
                typeUser: yup.string().required(),
            });
            try {
                await validateBody.validate(req.body, { abortEarly: false });
            }
            catch (error) {
                const responseValidadeBody = error;
                const validationErrors = {};
                responseValidadeBody.inner.forEach((error) => {
                    if (!error.path)
                        return;
                    validationErrors[error.path] = error.message;
                });
                return res.status(400).json(validationErrors);
            }
            try {
                const input = {
                    name,
                    lastName,
                    birthdate: new Birthdate_1.Birthdate(birthdate),
                    cpf: new Cpf_1.CPF(cpf),
                    email: new Email_1.Email(email),
                    address: {
                        street,
                        numberHome,
                        city,
                        district,
                        complement,
                        state,
                        country,
                    },
                    typeUser,
                };
                const output = await this.createUserService.execute(input);
                return res.status(201).json(output).send();
            }
            catch (error) {
                if (error instanceof errors_1.ErrorUserAlreadyExists ||
                    error instanceof errors_1.ErrorInvalidCpf ||
                    error instanceof errors_1.ErrorInvalidBirthdate ||
                    error instanceof errors_1.ErrorInvalidEmail) {
                    return res.status(400).json({ message: error.message }).send();
                }
                else {
                    return res.status(500).json({ message: error.message }).send();
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
     * @return {string}
     */
    getMethod() {
        return this.method;
    }
}
exports.CreateUserRoute = CreateUserRoute;
