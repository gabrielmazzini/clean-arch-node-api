/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {Request, Response} from "express";
import {HttpMethod, IRoute} from "../../routes";
import {ErrorUserNotFound} from "../../../../errors/errors";
import {UpdateBarberUsecase} from "../../../../usecase/barber/update/update-barber-usecase";
import {
  IUpdateBarberPresenterInputDto,
  updateBarberPresenterOutputDto,
} from "./update-barber-presenter-dto";
/**
 */
export class UpdatePlantRoute implements IRoute {
  /**
   * @param {string} path
   * @param {HttpMethod} httpMethod
   * @param {UpdatePlantUsecase} updateBarberUsecase
   */
  private constructor(
    private readonly path: string,
    private readonly httpMethod: HttpMethod,
    private readonly updateBarberUsecase: UpdateBarberUsecase,
  ) {}

  /**
   * @param {UpdatePlantUsecase} updateBarberUsecase
   * @return {UpdatePlantRoute}
   */
  public static create(updateBarberUsecase: UpdateBarberUsecase) {
    return new UpdatePlantRoute(
      "/plant/:id",
      HttpMethod.PUT,
      updateBarberUsecase,
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
      const input: IUpdateBarberPresenterInputDto = {
        id: id,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        featuredImage: req.body.featuredImage,
        portfolio: req.body.portfolio,
        address: req.body.address,
        reviews: req.body.reviews,
        typeOfService: req.body.typeOfService,
        transationsId: req.body.transationsId,
        barbershopId: req.body.barbershopId,
        openingHours: req.body.openingHours,
        socialMedia: req.body.socialMedia,
        typeUser: req.body.typeUser,
      };
      try {
        const output: updateBarberPresenterOutputDto =
          await this.updateBarberUsecase.execute(input);
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
