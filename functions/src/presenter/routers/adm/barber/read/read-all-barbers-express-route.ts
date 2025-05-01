/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {HttpMethod, IRoute} from "../../../routes";
import {Request, Response} from "express";
import {RealAllBarbersUsecase} from "../../../../../usecase/adm/barber/read/read-all-barbers-usecase";
import {RealAllBarbersPresenterDto} from "./read-all-barbers-presenter-dto";

/**
 */
export class ReadAllBarbersRoute implements IRoute {
  /**
   * @param {string} path
   * @param {HttpMethod} httpMethod
   * @param {RealAllBarbersUsecase} realAllPlantsUsecase
   */
  private constructor(
    private readonly path: string,
    private readonly httpMethod: HttpMethod,
    private readonly realAllBarbersUsecase: RealAllBarbersUsecase,
  ) {}
  /**
   * @param {RealAllBarbersUsecase} realAllBarbersUsecase
   * @return {ReadAllPlantsRoute}
   */
  public static create(realAllBarbersUsecase: RealAllBarbersUsecase) {
    return new ReadAllBarbersRoute(
      "/barber",
      HttpMethod.GET,
      realAllBarbersUsecase,
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
        const response = await this.realAllBarbersUsecase.execute();
        if (response.length === 0) {
          return res.status(200).json(response);
        }
        const output: RealAllBarbersPresenterDto = response;
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
