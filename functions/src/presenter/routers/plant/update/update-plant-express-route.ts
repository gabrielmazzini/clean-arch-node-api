/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {Request, Response} from "express";
import {HttpMethod, IRoute} from "../../routes";
import {ErrorUserNotFound} from "../../../../errors/errors";
import {UpdatePlantUsecase} from "../../../../usecase/plant/update/update-plant-usecase";
import {
  IUpdatePlantPresenterInputDto,
  updatePlantPresenterOutputDto,
} from "./update-plant-presenter-dto";
// import {Birthdate} from "../../../../domain/objectsValue/Birthdate";
/**
 */
export class UpdatePlantRoute implements IRoute {
  /**
   * @param {string} path
   * @param {HttpMethod} httpMethod
   * @param {UpdatePlantUsecase} updatePlantUsecase
   */
  private constructor(
    private readonly path: string,
    private readonly httpMethod: HttpMethod,
    private readonly updatePlantUsecase: UpdatePlantUsecase,
  ) {}

  /**
   * @param {UpdatePlantUsecase} updatePlantUsecase
   * @return {UpdatePlantRoute}
   */
  public static create(updatePlantUsecase: UpdatePlantUsecase) {
    return new UpdatePlantRoute(
      "/plant/:id",
      HttpMethod.PUT,
      updatePlantUsecase,
    );
  }
  /**
   * @return {Promise<any>}
   */
  getHandler(): (req: Request, res: Response) => Promise<any> {
    /**
     * @param {Request} req
     * @param {Response} res
     */
    return async (req: Request, res: Response) => {
      const id = req.params.id;
      const input: IUpdatePlantPresenterInputDto = {
        id: id,
        scientificName: req.body.scientificName,
        popularName: req.body.popularName,
        species: req.body.species,
        image: req.body.image,
        createdAt: req.body.createdAt,
      };
      try {
        const output: updatePlantPresenterOutputDto =
          await this.updatePlantUsecase.execute(input);
        return res.status(200).json(output).send();
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
