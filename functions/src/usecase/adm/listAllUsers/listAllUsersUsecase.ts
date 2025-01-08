/* eslint-disable brace-style */
/* eslint-disable indent */
import {User} from "../../../domain/entity/user/UserEntity";
import {Service} from "../../../service/service";
import {Usecase} from "../../usecase";
import {GetAllUsersInputDto, GetAllUsersOutputDto} from "./listAllUsersDto";

/**
 */
export class GetAllUsersUsecase
  implements Usecase<GetAllUsersInputDto, GetAllUsersOutputDto>
{
  /**
   * @param {Service} service
   */
  constructor(private service: Service) {}
  /**
   * @param {Service} service
   * @return {GetAllUsersUsecase}
   */
  public static create(service: Service) {
    return new GetAllUsersUsecase(service);
  }
  /**
   */
  async execute(): Promise<GetAllUsersOutputDto[] | []> {
    const users = await this.service.readAll("user");
    if (users === null || users.length === 0) {
      return [];
    }
    const output = this.presenter(users as unknown as User[]);
    return output;
  }
  /**
   * @param {User} users
   * @return {GetAllUsersOutputDto}
   */
  private presenter(users: User[]): GetAllUsersOutputDto[] {
    const output = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        lastName: user.lastName,
        birthdate: user.birthdate.format(),
        cpf: user.cpf.value(),
        email: user.email.value(),
        address: user.address,
        typeUser: user.typeUser,
      };
    });
    return output;
  }
}
