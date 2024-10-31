import { User } from "../entity/user/UserEntity";

export interface IUserRepository {
    createUser(user: User): Promise<object>;
    list(id: string): Promise<User | null>;
    updateUser(id: string, input: User): Promise<boolean>;
    deleteUser(id: string): Promise<boolean>;
}