/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {HttpMethod, IRoute} from "../../../routes";
import {Request, Response} from "express";
import {RealAllPlantsUsecase} from "../../../../../usecase/adm/plant/read/read-all-plants-usecase";
import {RealAllPlantsPresenterDto} from "./read-all-plants-presenter-dto";

/**
 */
export class ReadAllPlantsRoute implements IRoute {
  /**
   * @param {string} path
   * @param {HttpMethod} httpMethod
   * @param {RealAllPlantsUsecase} realAllPlantsUsecase
   */
  private constructor(
    private readonly path: string,
    private readonly httpMethod: HttpMethod,
    private readonly realAllPlantsUsecase: RealAllPlantsUsecase,
  ) {}
  /**
   * @param {RealAllPlantsUsecase} realAllPlantsUsecase
   * @return {ReadAllPlantsRoute}
   */
  public static create(realAllPlantsUsecase: RealAllPlantsUsecase) {
    return new ReadAllPlantsRoute(
      "/plant",
      HttpMethod.GET,
      realAllPlantsUsecase,
    );
  }
  /**
   * @param {Response} res
   * @param {Request} req
   * @return {Promise}
   */
  getHandler(): (req: Request, res: Response) => Promise<any> {
    /**
     * @param {Request} req
     * @param {Response} res
     */
    return async (req: Request, res: Response) => {
      try {
        const response = await this.realAllPlantsUsecase.execute();
        if (response.length === 0) {
          return res.status(200).json(response);
        }
        const output: RealAllPlantsPresenterDto = response;
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
