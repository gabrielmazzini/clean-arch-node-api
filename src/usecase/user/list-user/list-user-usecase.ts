/* eslint-disable max-len */
import {User} from "../../../domain/entity/user/UserEntity";
import {UserRepositoryLokijs} from "../../../infra/repositories/lokiJs/user-repository-lokijs";
import {ErrorUserNotFound} from "../../../erros/errors";
import {Usecase} from "../../usecase";
import {GetUserInputDto, GetUserOutputDto} from "./list-user-dto";

/**
 */
export class GetUserUsecase implements Usecase<GetUserOutputDto, GetUserInputDto>{
  #userRepository
  /**
     * @param {UserRepositoryLokijs} userRepository
     */
  private constructor(
      userRepository: UserRepositoryLokijs
  ) {
    this.#userRepository = userRepository;
  }
  /**
   * @param {UserRepositoryLokijs} userRepository
   * @return {void}
   */
  public static create(userRepository: UserRepositoryLokijs) {
    return new GetUserUsecase(userRepository);
  }
  /**
   * @param {GetUserInputDto} input
   */
  async execute(input: GetUserInputDto): Promise<GetUserOutputDto> {
      const user = await this.#userRepository.list(input.id);
      if (user === null) {
        throw new ErrorUserNotFound("User not found");
      }
      const output = GetUserUsecase.presenter(user);
      return output;
  }
  /**
   * @param {User} user
   * @return {GetUserOutputDto}
   */
  private static presenter(user: User): GetUserOutputDto {
    const output: GetUserOutputDto = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      birthdate: user.birthdate.format(),
      cpf: user.cpf.value(),
      email: user.email.value(),
      address: user.address,
      typeUser: user.typeUser
    };
    return output;
  }
}
