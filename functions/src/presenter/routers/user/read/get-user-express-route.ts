/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {Request, Response} from "express";
import {GetUserUsecase} from "../../../../usecase/user/read/list-user-usecase";
import {HttpMethod, IRoute} from "../../routes";
import {ErrorUserNotFound} from "../../../../errors/errors";
import {IGetUserPresenterOutputDto} from "./get-user-presenter-dto";

/**
 */
export class GetUsersRoute implements IRoute {
  /**
   * @param {string} path
   * @param {HttpMethod} httpMethod
   * @param {GetUserUsecase} getUserUsecase
   */
  private constructor(
    private readonly path: string,
    private readonly httpMethod: HttpMethod,
    private readonly getUserUsecase: GetUserUsecase,
  ) {}
  /**
   * @param {GetUserUsecase} getUserUsecase
   * @return {GetUsersRoute}
   */
  public static create(getUserUsecase: GetUserUsecase) {
    return new GetUsersRoute("/user/:id", HttpMethod.GET, getUserUsecase);
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
      const id = req.params.id;
      try {
        const output: IGetUserPresenterOutputDto =
          await this.getUserUsecase.execute({id: id});
        return res.status(200).json(output);
      } catch (error: any) {
        if (error instanceof ErrorUserNotFound) {
          return res.status(404).json({message: error.message}).send();
        }
        return res.status(500).json({message: error.message}).send();
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
