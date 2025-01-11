/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {Request, Response} from "express";
import {HttpMethod, IRoute} from "../../../routers/routes";
import * as yup from "yup";
import {CreatePlantUsecase} from "../../../../usecase/plant/create/create-plant-usecase";
import {
  IcreatePlantPresenterInputDto,
  IcreatePlantPresenterOutputDto,
} from "./create-plant-presenter-dto";

/**
 */
export class CreatePlantRoute implements IRoute {
  /**
   * @param {string} path
   * @param {HttpMethod} method
   * @param {CreatePlantUsecase} createPlantUsecase
   */
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createPlantUsecase: CreatePlantUsecase,
  ) {}
  /**
   * @param {CreatePlantUsecase} createPlantUsecase
   * @return {CreateUserRoute}
   */
  public static create(createPlantUsecase: CreatePlantUsecase) {
    return new CreatePlantRoute("/plant", HttpMethod.POST, createPlantUsecase);
  }
  /**
   * @param {Request} req
   * @param {Response} res
   * @return {void}
   */
  getHandler(): (req: Request, res: Response) => Promise<any> {
    /**
     * @param {Request} req
     * @param {Response} res
     */
    return async (req: Request, res: Response) => {
      const {scientificName, popularName, species, image} = req.body;
      const validateBody = yup.object().shape({
        scientificName: yup.string().required(),
        popularName: yup.string().required(),
        species: yup.string().required(),
        image: yup.string().required(),
      });
      try {
        await validateBody.validate(req.body, {abortEarly: false});
      } catch (error) {
        const responseValidadeBody = error as yup.ValidationError;
        const validationErrors: Record<string, string> = {};
        responseValidadeBody.inner.forEach((error: any) => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });
        return res.status(400).json(validationErrors);
      }
      try {
        const input: IcreatePlantPresenterInputDto = {
          scientificName,
          popularName,
          species,
          image,
        };
        const output: IcreatePlantPresenterOutputDto =
          await this.createPlantUsecase.execute(input);
        return res.status(201).json(output).send();
      } catch (error: any) {
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
   * @return {string}
   */
  getMethod(): HttpMethod {
    return this.method;
  }
}
