/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {GetAllUsersUsecase} from "../../../../usecase/adm/listAllUsers/listAllUsersUsecase";
import {ErrorNoUsersCollection, ErrorUserNotFound} from "../../../../erros/errors";
import {HttpMethod, Route} from "../../routes";
import {Request, Response} from "express";

export type GetAllUsersResponseDto = {
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
}[];

/**
 */
export class GetAllUsersRoute implements Route {
  /**
     * @param {string} path
     * @param {HttpMethod} httpMethod
     * @param {GetAllUsersUsecase} getAllUsersUsecase
     */
  private constructor(
        private readonly path: string,
        private readonly httpMethod: HttpMethod,
        private readonly getAllUsersUsecase: GetAllUsersUsecase,
  ) {}
  /**
   * @param {GetAllUsersUsecase} getAllUsersUsecase
   * @return {GetAllUsersRoute}
   */
  public static create(getAllUsersUsecase: GetAllUsersUsecase) {
    return new GetAllUsersRoute(
      "/user",
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
      try {
        const response = await this.getAllUsersUsecase.execute();
        if(response === null) {
            throw new ErrorUserNotFound("User not found");
        }
        const output: GetAllUsersResponseDto = response;
        res.status(200).json(output);
      } catch (error: any) {
        if (error instanceof ErrorNoUsersCollection) {
          res.status(404).json(error.message);
        }
        res.status(500).json(error.message);
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
