/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {Request, Response} from "express";
import {HttpMethod, IRoute} from "../../routes";
import * as yup from "yup";
import {CreateBarberUsecase} from "../../../../usecase/barber/create/create-barber-usecase";
import {
  IcreateBarberPresenterInputDto,
  IcreateBarberPresenterOutputDto,
} from "./create-barber-presenter-dto";

/**
 */
export class CreateBarberRoute implements IRoute {
  /**
   * @param {string} path
   * @param {HttpMethod} method
   * @param {CreatePlantUsecase} createBarberUsecase
   */
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createBarberUsecase: CreateBarberUsecase,
  ) {}
  /**
   * @param {CreatePlantUsecase} createBarberUsecase
   * @return {CreateUserRoute}
   */
  public static create(createBarberUsecase: CreateBarberUsecase) {
    return new CreateBarberRoute("/barber", HttpMethod.POST, createBarberUsecase);
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
      const {name, lastName, email, phone, featuredImage, portfolio,
      address, reviews, typeOfService, transationsId, barbershopId, 
      openingHours, socialMedia, typeUser} = req.body;
      const validateBody = yup.object().shape({
        name: yup.string().required("name is required"),
        lastName: yup.string().required("lastName is required"),
        email: yup.string().required("email is required"),
        phone: yup.number().required("phone is required"),
        featuredImage: yup.string().required("featuredImage is required"),
        portfolio: yup.array().of(yup.string()).required("portfolio is required"),
        address: yup.string().required("address is required"),
        reviews: yup.array().of(yup.number()),
        typeOfService: yup.array().of(yup.string()).required("typeOfService is required"),
        transationsId: yup.array().of(yup.string()),
        barbershopId: yup.string().required("barbershopId is required"),
        openingHours: yup.array().of(yup.string()).required("openingHours is required"),
        socialMedia: yup.array().of(yup.string()),
        typeUser: yup.string().required("typeUser is required"),
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
        const input: IcreateBarberPresenterInputDto = {
          name,
          lastName,
          email,
          phone,
          featuredImage,
          portfolio,
          address,
          reviews,
          typeOfService,
          transationsId,
          barbershopId,
          openingHours,
          socialMedia,
          typeUser,
        };
        const output: IcreateBarberPresenterOutputDto =
          await this.createBarberUsecase.execute(input);
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
