/* eslint-disable max-len */
import {Request, Response} from "express";
import {HttpMethod, Route} from "../../routes";
import {CreateUserUseCase} from "../../../../usecase/user/create-user/create-user-usecase";
import {CreateUserInputDto} from "../../../../usecase/user/create-user/create-user-dto";
import {ErrorInvalidBirthdate, ErrorInvalidCpf, ErrorInvalidEmail, ErrorUserAlreadyExists,} from "../../../../erros/errors";
import * as yup from "yup";
import { CPF } from "../../../../domain/objectsValue/Cpf";
import { Birthdate } from "../../../../domain/objectsValue/Birthdate";
import { Email } from "../../../../domain/objectsValue/Email";

export type CreateUserResponseDto = {
    id: string;
    message: string;
}
/**
 */
export class CreateUserRoute implements Route {
  /**
   * @param {string} path
   * @param {HttpMethod} method
   * @param {CreateUserUseCase} createUserService
     */
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createUserService: CreateUserUseCase,
  ) {}
  /**
   * @param {CreateUserUseCase} createUserService
   * @return {CreateUserRoute}
   */
  public static create(createUserService: CreateUserUseCase) {
    return new CreateUserRoute(
      "/user",
      HttpMethod.POST,
      createUserService,
    );
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
      const {name, lastName, birthdate, cpf, email, address: {
        street,
        numberHome,
        city,
        district,
        complement,
        state,
        country
      },
      typeUser,} = req.body;
      const validateBody= yup.object().shape({
        name: yup.string().required(),
        lastName: yup.string().required(),
        birthdate: yup.string().required(),
        cpf: yup.string().required(),
        email: yup.string().required(),
        address: yup.object({
          street: yup.string().required(),
          numberHome: yup.number().required(),
          city: yup.string().required(),
          district: yup.string().required(),
          complement: yup.string(),
          state: yup.string().required(),
          country: yup.string().required(),
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
        const input: CreateUserInputDto = {
          name,
          lastName,
          birthdate: new Birthdate(birthdate),
          cpf: new CPF(cpf),
          email: new Email(email),
          address: {
            street,
            numberHome,
            city,
            district,
            complement,
            state,
            country,
          },
          typeUser,
        };
        const output: CreateUserResponseDto = await this.createUserService.execute(input);
        return res.status(201).json(output).send();
      } catch (error: any) {
        if (error instanceof ErrorUserAlreadyExists || 
            error instanceof ErrorInvalidCpf || 
            error instanceof ErrorInvalidBirthdate || 
            error instanceof ErrorInvalidEmail) {
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
