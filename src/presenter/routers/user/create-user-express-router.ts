/* eslint-disable max-len */
import {Request, Response} from "express";
import {HttpMethod, Route} from "../routes";
import {CreateUserUseCase} from "../../../usecase/user/create-user/create-user-usecase";
import {CreateUserInputDto} from "../../../usecase/user/create-user/create-user-dto";
import {ErrorUserAlreadyExists} from "../errors";
import * as yup from "yup";

export type CreateUserResponseDto = {
    id: string;
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
  getHandler(): (req: Request, res: Response) => Promise<void> {
    /**
     * @param {Request} req
     * @param {Response} res
     */
    return async (req: Request, res: Response) => {
      const {name, lastName, dataNasc, cpf, email, address: {
        street,
        numberHome,
        district,
        complement,
        state,
        country
      }} = req.body;
      const validateBody= yup.object().shape({
        name: yup.string().required(),
        lastName: yup.string().required(),
        dataNasc: yup.string().required(),
        cpf: yup.number().required(),
        email: yup.string().required(),
        address: yup.object({
          street: yup.string().required(),
          numberHome: yup.number().required(),
          district: yup.string().required(),
          complement: yup.string(),
          state: yup.string().required(),
          country: yup.string().required(),
        })
      });
      try {
        await validateBody.validate(req.body, {abortEarly: false});
      } catch (error) {
        const responseValidadeBody = error as yup.ValidationError;
        const validationErrors: Record<string, string> = {};
        responseValidadeBody.inner.forEach((error) => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });
        res.status(400).json(validationErrors);
      }
      const input: CreateUserInputDto = {
        name,
        lastName,
        dataNasc,
        cpf,
        email,
        address: {
          street,
          numberHome,
          district,
          complement,
          state,
          country,
        }
      };
      try {
        const output: CreateUserResponseDto = await this.createUserService.execute(input);
        const responseBody = this.present(output);
        res.status(201).json(responseBody).send();
      } catch (error: any) {
        if (error instanceof ErrorUserAlreadyExists) {
          res.status(400).json({message: error.message}).send();
        } else {
          res.status(500).json({message: error.message}).send();
        }
      }
    };
  }
  /**
   * @param {CreateUserResponseDto} input
   * @return {CreateUserResponseDto}
   */
  private present(input: CreateUserResponseDto): CreateUserResponseDto {
    const response = {id: input.id};
    return response;
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
