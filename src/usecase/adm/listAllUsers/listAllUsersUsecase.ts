import {User} from "../../../domain/entity/user/UserEntity";
import {IAdminRepository} from "../../../domain/repositories/admRepositorie";
import {Usecase} from "../../usecase";
import {GetAllUsersInputDto, GetAllUsersOutputDto} from "./listAllUsersDto";

/**
 */
export class GetAllUsersUsecase implements Usecase<GetAllUsersInputDto, GetAllUsersOutputDto> {
    /**
       * @param {IAdminRepository} adminRepository
       */
    constructor(private adminRepository: IAdminRepository) {}
    /**
     * @param {IAdminRepository} adminRepository
     * @return {GetAllUsersUsecase}
     */
    public static create(adminRepository: IAdminRepository) {
      return new GetAllUsersUsecase(adminRepository);
    }
    /**
     */
    async execute(): Promise<GetAllUsersOutputDto[] | []> {
        const users = (await this.adminRepository.listAllUsers())
        if(users === null || users.length === 0) {
            return [];
        }
        const output = this.presenter(users);
        return output;
    };
    /**
     * @param {User} users
     * @return {GetAllUsersOutputDto}
     */
    private presenter(users: User[]): GetAllUsersOutputDto[] {
        const output = users.map(user => {
            return {
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                birthdate: user.birthdate.format(),
                cpf: user.cpf.value(),
                email: user.email.value(),
                address: user.address,
                typeUser: user.typeUser
            };
        });
        return output;
  };
};