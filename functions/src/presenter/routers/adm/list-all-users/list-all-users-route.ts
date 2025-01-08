/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {GetAllUsersUsecase} from "../../../../usecase/adm/listAllUsers/listAllUsersUsecase";
import {HttpMethod, IRoute} from "../../routes";
import {Request, Response} from "express";
import {GetAllUsersPresenterOutputDto} from "./list-all-users-presenter-dto";

/**
 */
export class GetAllUsersRoute implements IRoute {
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
    return new GetAllUsersRoute("/user", HttpMethod.GET, getAllUsersUsecase);
  }
  /**
   * @param {Response} res
   * @return {Promise}
   */
  getHandler(): (req: Request, res: Response) => Promise<any> {
    /**
     * @param {Request} req
     * @param {Response} res
     */
    return async (req: Request, res: Response) => {
      try {
        const response = await this.getAllUsersUsecase.execute();
        if (response.length === 0) {
          return res.status(200).json(response);
        }
        const output: GetAllUsersPresenterOutputDto = response;
        return res.status(200).json(output);
      } catch (error: any) {
        return res.status(500).json(error.message);
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
