/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {Request, Response} from "express";
import {HttpMethod, IRoute} from "../../routes";
import {ErrorPlantNotFound} from "../../../../errors/errors";
import {ReadBarberUsecase} from "../../../../usecase/barber/read/read-barber-usecase";
import {IReadBarberPresenterOutputDto} from "./read-barber-presenter-dto";

/**
 */
export class ReadPlantRoute implements IRoute {
  /**
   * @param {string} path
   * @param {HttpMethod} httpMethod
   * @param {ReadPlantUsecase} readBarberUsecase
   */
  private constructor(
    private readonly path: string,
    private readonly httpMethod: HttpMethod,
    private readonly readBarberUsecase: ReadBarberUsecase,
  ) {}
  /**
   * @param {ReadPlantUsecase} readBarberUsecase
   * @return {GetUsersRoute}
   */
  public static create(readBarberUsecase: ReadBarberUsecase) {
    return new ReadPlantRoute("/barber/:id", HttpMethod.GET, readBarberUsecase);
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
        const output: IReadBarberPresenterOutputDto =
          await this.readBarberUsecase.execute({id: id});
        return res.status(200).json(output);
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
