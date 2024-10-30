import {User} from "../entity/user/UserEntity";

export interface IAdminRepository {
    listAllUsers(): Promise<User[]| []>;
}