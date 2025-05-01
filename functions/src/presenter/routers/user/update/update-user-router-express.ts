/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {Request, Response} from "express";
import {HttpMethod, IRoute} from "../../routes";
import {UpdateUserUsecase} from "../../../../usecase/user/update/update-user-usecase";
import {
  IUpdateUserInputPresenterDto,
  IUpdateUserOutputPresenterDto,
} from "./update-user-presenter-dto";
import {ErrorUserNotFound} from "../../../../errors/errors";
// import {Birthdate} from "../../../../domain/objectsValue/Birthdate";
/**
 */
export class UpdateUserRoute implements IRoute {
  /**
   * @param {string} path
   * @param {HttpMethod} httpMethod
   * @param {UpdateUserUsecase} updateUserUsecase
   */
  private constructor(
    private readonly path: string,
    private readonly httpMethod: HttpMethod,
    private readonly updateUserUsecase: UpdateUserUsecase,
  ) {}

  /**
   * @param {UpdateUserUsecase} updateUserUsecase
   * @return {GetAllUsersRoute}
   */
  public static create(updateUserUsecase: UpdateUserUsecase) {
    return new UpdateUserRoute("/user/:id", HttpMethod.PUT, updateUserUsecase);
  }
  /**
   * @return {any}
   */
  getHandler(): (req: Request, res: Response) => Promise<any> {
    /**
     * @param {Request} req
     * @param {Response} res
     */
    return async (req: Request, res: Response) => {
      const id = req.params.id;
      const input: IUpdateUserInputPresenterDto = {
        id: id,
        name: req.body.name,
        lastName: req.body.lastName,
        phone: req.body.phone,
        birthdate: req.body.birthdate,
        cpf: req.body.cpf,
        email: req.body.email,
        creditCard: {
          cardNumber: req.body.creditCard.cardNumber,
          cvv: req.body.cvv,
          expirationDate: req.body.creditCard.expirationDate,
          holderName: req.body.creditCard.holderName,
          holderCpf: req.body.creditCard.holderCpf,
        },
        featuredImage: req.body.featuredImage,
        geoLocation: {
          latitude: req.body.geoLocation.latitude,
          longitude: req.body.geoLocation.longitude,
        },
      };
      try {
        const output: IUpdateUserOutputPresenterDto =
          await this.updateUserUsecase.execute(input);
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
