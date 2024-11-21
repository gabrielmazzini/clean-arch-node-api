import { User } from "../entity/user/UserEntity";

export interface IUserRepository {
    createUser(user: User): Promise<object>;
    list(id: string): Promise<User | null>;
    updateUser(input: any): Promise<boolean>;
    deleteUser(id: string): Promise<boolean>;
}