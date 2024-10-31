import { DeleteUserUsecase } from "../../../../usecase/user/delete-user/delete-user-usecase";
import { HttpMethod, IRoute } from "../../routes";
import {Request, Response} from "express";
import { IDeleteOutputPresenterDto } from "./delete-user-presenter-dto";
import { ErrorUserNotFound } from "../../../../errors/errors";

export class DeleteUserRoute implements IRoute {
    /**
     * @param {string} path
     * @param {HttpMethod} httpMethod
     * @param {DeleteUserUsecase} deleteUserUsecase
     */
    private constructor(
        private readonly path: string,
        private readonly httpMethod: HttpMethod,
        private readonly deleteUserUsecase: DeleteUserUsecase,
    ) {};
    /**
     * @param {DeleteUserUsecase} deleteUserUsecase
     * @return {DeleteUserRoute}
     */
    public static create(deleteUserUsecase: DeleteUserUsecase): DeleteUserRoute {
        return new DeleteUserRoute(
            "/user/:id",
            HttpMethod.DELETE,
            deleteUserUsecase,
        );
    };
    /**
     * @param {Request} req
     * @param {Response} res
     * @return {Promise}
     */
    getHandler(): (req: Request, res: Response) => Promise<any> {
        /**
         * @param {Request} req
         * @param {Response} res
         */
        return async (req: Request, res: Response) => {
            const id = req.params.id;
            try {
                const output: IDeleteOutputPresenterDto = await this.deleteUserUsecase.execute({id});
                return res.status(200).json(output).send();
            } catch (error: any) {
                if(error instanceof ErrorUserNotFound) {
                    return res.status(404).json({message: error.message}).send();
                }
                return res.status(500).json({message: error});
            };
        };
    };
    /**
     * @return {string}
     */
    getPath(): string {
        return this.path;
    };
    /**
     * @return {HttpMethod}
     */
    getMethod(): HttpMethod {
        return this.httpMethod;
    };
};