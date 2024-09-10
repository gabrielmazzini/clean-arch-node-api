/* eslint-disable max-len */
import {Request, Response} from "express";
import {HttpMethod, Route} from "../routes";
import {CreateUserUseCase} from "../../../usecase/user/create-user/create-user-usecase";
import {CreateUserInputDto} from "../../../usecase/user/create-user/create-user-dto";
import {ErrorUserAlreadyExists} from "../errors";

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
      const {name, email, password} = req.body;
      const input: CreateUserInputDto = {
        name,
        email,
        password,
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
