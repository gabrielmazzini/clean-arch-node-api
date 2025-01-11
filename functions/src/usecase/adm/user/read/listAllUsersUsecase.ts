/* eslint-disable brace-style */
/* eslint-disable indent */
import {User} from "../../../../domain/entity/user/UserEntity";
import {UserMapper} from "../../../../domain/mappers/userMapper";
import {ServiceHttp} from "../../../../service/services-http";
import {Usecase} from "../../../usecase";
import {GetAllUsersInputDto, GetAllUsersOutputDto} from "./listAllUsersDto";

/**
 */
export class GetAllUsersUsecase
  implements Usecase<GetAllUsersInputDto, GetAllUsersOutputDto>
{
  /**
   * @param {Service} serviceHttp
   */
  constructor(private serviceHttp: ServiceHttp) {}
  /**
   * @param {Service} serviceHttp
   * @return {GetAllUsersUsecase}
   */
  public static create(serviceHttp: ServiceHttp) {
    return new GetAllUsersUsecase(serviceHttp);
  }
  /**
   */
  async execute(): Promise<GetAllUsersOutputDto[] | []> {
    const docs = await this.serviceHttp.readAll("user");
    if (docs === null || docs.length === 0) {
      return [];
    }
    const users = docs.map((data) => UserMapper.toEntity(data.data()));
    const output = this.presenter(users);
    return output;
  }
  /**
   * @param {User} users
   * @return {GetAllUsersOutputDto}
   */
  private presenter(users: User[]): GetAllUsersOutputDto[] {
    const output = users.map((user) => {
      return UserMapper.toDto(user);
    });
    return output;
  }
}
