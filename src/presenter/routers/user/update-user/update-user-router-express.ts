import { Request, Response } from "express";
import { HttpMethod, Route } from "../../routes";
import { UpdateUserUsecase } from "../../../../usecase/user/update-user/update-user-usecase";
import { UpdateUserInputPresenterDto, UpdateUserOutputPresenterDto } from "./update-user-presenter-dto";
import { Birthdate } from "../../../../domain/objectsValue/Birthdate";
import { CPF } from "../../../../domain/objectsValue/Cpf";
import { Email } from "../../../../domain/objectsValue/Email";
import { ErrorUserNotFound } from "../../../../erros/errors";

/**
 */
export class UpdateUserRoute implements Route {
    /**
       * @param {string} path
       * @param {HttpMethod} httpMethod
       * @param {UpdateUserUsecase} updateUserUsecase
       */
    private constructor(
          private readonly path: string,
          private readonly httpMethod: HttpMethod,
          private readonly updateUserUsecase: UpdateUserUsecase,
    ) {}

    /**
     * @param {UpdateUserUsecase} updateUserUsecase
     * @return {GetAllUsersRoute}
     */
    public static create(updateUserUsecase: UpdateUserUsecase) {
      return new UpdateUserRoute(
        "/user/:id",
        HttpMethod.PUT,
        updateUserUsecase,
      );
    };

    getHandler(): (req: Request, res: Response) => Promise<any> {
        /**
         * @param {Request} req
         * @param {Response} res
         */
        return async (req: Request, res: Response) => {
            const id = req.params.id;
            const input: UpdateUserInputPresenterDto = {
                id: id,
                name: req.body.name,
                lastName: req.body.lastName,
                birthdate: new Birthdate(req.body.birthdate),
                cpf: new CPF(req.body.cpf),
                email: new Email(req.body.email),
                address: req.body.address,
                typeUser: req.body.typeUser
            };
            try {
                const output: UpdateUserOutputPresenterDto = await this.updateUserUsecase.execute(input);
                return res.status(200).json(output).send();
            } catch (error: any) {
                if(error instanceof ErrorUserNotFound) {
                    return res.status(404).json(error).send
                };
                return res.status(500).json(error.message).send();
            };
        };
    };

    /**
     * @return {string}
     */
    getPath(): string {
        return this.path;
    }
    /**
     * @return {HttpMethod}
     */
    getMethod(): HttpMethod {
        return this.httpMethod;
    }
}