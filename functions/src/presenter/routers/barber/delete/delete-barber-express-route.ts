/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {DeleteBarberUsecase} from "../../../../usecase/barber/delete/delete-barber-usecase";
import {HttpMethod, IRoute} from "../../routes";
import {Request, Response} from "express";
import {IDeleteBarberPresenterOutputDto} from "./delete-barber-presenter-dto";
import {ErrorPlantNotFound} from "../../../../errors/errors";
/**
 */
export class DeleteBarberRoute implements IRoute {
  /**
   * @param {string} path
   * @param {HttpMethod} httpMethod
   * @param {DeletePlantUsecase} deletePlantUsecase
   */
  private constructor(
    private readonly path: string,
    private readonly httpMethod: HttpMethod,
    private readonly deleteBarberUsecase: DeleteBarberUsecase,
  ) {}
  /**
   * @param {DeletePlantUsecase} deleteBarberUsecase
   * @return {DeletePlantRoute}
   */
  public static create(
    deleteBarberUsecase: DeleteBarberUsecase,
  ): DeleteBarberRoute {
    return new DeleteBarberRoute(
      "/barber/:id",
      HttpMethod.DELETE,
      deleteBarberUsecase,
    );
  }
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
        const output: IDeleteBarberPresenterOutputDto =
          await this.deleteBarberUsecase.execute({id});
        return res.status(200).json(output).send();
      } catch (error: any) {
        if (error instanceof ErrorPlantNotFound) {
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
