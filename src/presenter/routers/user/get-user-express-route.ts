/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {Request, Response} from "express";
import {GetUserUsecase} from "../../../usecase/user/list-user/list-user-usecase";
import {HttpMethod, Route} from "../routes";
import {UserModel} from "../../../infra/database/models/user-model";

export type GetAllUsersResponseDto = UserModel[];

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
        private readonly getAllUsersUsecase: GetUserUsecase,
  ) {}
  /**
   * @param {GetAllUsersUsecase} getAllUsersUsecase
   * @return {GetAllUsersRoute}
   */
  public static create(getAllUsersUsecase: GetUserUsecase) {
    return new GetAllUsersRoute(
      "/all-users",
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
        const output: GetAllUsersResponseDto = await this.getAllUsersUsecase.execute();
        res.status(200).json(output);
      } catch (error: any) {
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
