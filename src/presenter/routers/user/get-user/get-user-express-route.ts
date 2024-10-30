/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {Request, Response} from "express";
import {GetUserUsecase} from "../../../../usecase/user/list-user/list-user-usecase";
import {HttpMethod, Route} from "../../routes";
import { ErrorUserNotFound } from "../../../../erros/errors";

export interface GetUserResponseDto {
    id: string;
    name: string;
    lastName: string;
    birthdate: string;
    cpf: string;
    email: string;
    address: {
      street: string;
      complement?: string;
      numberHome: string;
      district: string;
      state: string;
      city: string;
      country: string;
    };
    typeUser: string;
}

/**
 */
export class GetUsersRoute implements Route {
  /**
     * @param {string} path
     * @param {HttpMethod} httpMethod
     * @param {GetAllUsersUsecase} getAllUsersUsecase
     */
  private constructor(
        private readonly path: string,
        private readonly httpMethod: HttpMethod,
        private readonly getAllUsersUsecase: GetUserUsecase,
  ) {}
  /**
   * @param {GetAllUsersUsecase} getAllUsersUsecase
   * @return {GetAllUsersRoute}
   */
  public static create(getAllUsersUsecase: GetUserUsecase) {
    return new GetUsersRoute(
      "/user/:id",
      HttpMethod.GET,
      getAllUsersUsecase,
    );
  }
  /**
   * @param {Response} res
   * @return {Promise}
   */
  getHandler(): (req: Request, res: Response) => Promise<void> {
    /**
       * @param {Request} req
       * @param {Response} res
       */
    return async (req: Request, res: Response) => {
      const id = req.params.id;
      try {
        const output: GetUserResponseDto = await this.getAllUsersUsecase.execute({id: id});
        res.status(200).json(output);
      } catch (error: any) {
        if(error instanceof ErrorUserNotFound) {
          res.status(404).json({message: error.message}).send();
        } else {
          res.status(500).json({message: error.message}).send();
        }
      }
    };
  }
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
