/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {DeletePlantUsecase} from "../../../../usecase/plant/delete/delete-plant-usecase";
import {HttpMethod, IRoute} from "../../routes";
import {Request, Response} from "express";
import {IDeletePlantPresenterOutputDto} from "./delete-plant-presenter-dto";
import {ErrorPlantNotFound} from "../../../../errors/errors";
/**
 */
export class DeletePlantRoute implements IRoute {
  /**
   * @param {string} path
   * @param {HttpMethod} httpMethod
   * @param {DeletePlantUsecase} deletePlantUsecase
   */
  private constructor(
    private readonly path: string,
    private readonly httpMethod: HttpMethod,
    private readonly deletePlantUsecase: DeletePlantUsecase,
  ) {}
  /**
   * @param {DeletePlantUsecase} deletePlantUsecase
   * @return {DeletePlantRoute}
   */
  public static create(
    deletePlantUsecase: DeletePlantUsecase,
  ): DeletePlantRoute {
    return new DeletePlantRoute(
      "/plant/:id",
      HttpMethod.DELETE,
      deletePlantUsecase,
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
        const output: IDeletePlantPresenterOutputDto =
          await this.deletePlantUsecase.execute({id});
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
