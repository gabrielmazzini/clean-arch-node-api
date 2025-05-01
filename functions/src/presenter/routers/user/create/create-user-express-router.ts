/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {Request, Response} from "express";
import {HttpMethod, IRoute} from "../../routes";
import {CreateUserUsecase} from "../../../../usecase/user/create/create-user-usecase";
import {
  ErrorInvalidBirthdate,
  ErrorInvalidCpf,
  ErrorInvalidEmail,
  ErrorUserAlreadyExists,
} from "../../../../errors/errors";
import * as yup from "yup";
import {CPF} from "../../../../domain/objectsValue/Cpf";
import {Birthdate} from "../../../../domain/objectsValue/Birthdate";
import {Email} from "../../../../domain/objectsValue/Email";
import {
  ICreateUserPresenterInputDto,
  ICreateUserPresenterOutputDto,
} from "./create-user-presenter-dto";

/**
 */
export class CreateUserRoute implements IRoute {
  /**
   * @param {string} path
   * @param {HttpMethod} method
   * @param {CreateUserUsecase} createuserUsecase
   */
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createuserUsecase: CreateUserUsecase,
  ) {}
  /**
   * @param {CreateUserUseCase} createuserUsecase
   * @return {CreateUserRoute}
   */
  public static create(createuserUsecase: CreateUserUsecase) {
    return new CreateUserRoute("/user", HttpMethod.POST, createuserUsecase);
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
      const {
        name,
        lastName,
        phone,
        birthdate,
        cpf,
        email,
        creditCard,
        transationId,
        featuredImage,
        geoLocation,
        typeUser,
      } = req.body;
      const validateBody = yup.object().shape({
        name: yup.string().required(),
        lastName: yup.string().required(),
        phone: yup.number().required(),
        birthdate: yup.string().required(),
        cpf: yup.string().required(),
        email: yup.string().required(),
        creditCard: yup.object().shape({
          cardNumber: yup.string().required(),
          cvv: yup.number().required(),
          expirationDate: yup.string().required(),
          holderName: yup.string().required(),
          holderCpf: yup.string().required(),
        }),
        transationId: yup.array().of(yup.string()),
        featuredImage: yup.string().required(),
        geoLocation: yup.object().shape({
          latitude: yup.string().required(),
          longitude: yup.string().required(),
        }),
        typeUser: yup.string().required(),
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
        const input: ICreateUserPresenterInputDto = {
          name,
          lastName,
          phone,
          birthdate: new Birthdate(birthdate),
          cpf: new CPF(cpf),
          email: new Email(email),
          creditCard: {
            cardNumber: creditCard.cardNumber,
            cvv: creditCard.cvv,
            expirationDate: creditCard.expirationDate,
            holderName: creditCard.holderName,
            holderCpf: new CPF(creditCard.holderCpf),
          },
          transationId,
          featuredImage,
          geoLocation,
          typeUser,
        };
        const output: ICreateUserPresenterOutputDto =
          await this.createuserUsecase.execute(input);
        return res.status(201).json(output).send();
      } catch (error: any) {
        if (
          error instanceof ErrorUserAlreadyExists ||
          error instanceof ErrorInvalidCpf ||
          error instanceof ErrorInvalidBirthdate ||
          error instanceof ErrorInvalidEmail
        ) {
          return res.status(400).json({message: error.message}).send();
        } else {
          return res.status(500).json({message: error.message}).send();
        }
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
