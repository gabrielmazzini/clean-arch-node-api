/* eslint-disable max-len */
import {IUserRepository} from "../../../domain/repositories/userRepositorie";
import {UserModel} from "../../../infra/database/models/user-model";

/**
 */
export class GetUserUsecase {
  /**
     * @param {IUserRepository} userRepository
     */
  constructor(
        private userRepository: IUserRepository
  ) {}
  /**
   * @param {IUserRepository} userRepository
   * @return {void}
   */
  public static create(userRepository: IUserRepository) {
    return new GetUserUsecase(userRepository);
  }
  /**
   */
  async execute(): Promise<UserModel[]> {
    return (await this.userRepository.list())
  }
}
