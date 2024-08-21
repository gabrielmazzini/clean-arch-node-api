import {User} from "../entity/user/UserEntity";

export interface IUserRepository {
    fyndByEmail(email: string): Promise<object | null>;
    save(user: User): Promise<void>;
    getInfoUser(id: string): Promise<Omit<User, "password"> | null>;
    updateUser(id: string, input: Omit<User, "password" | "id">): Promise<boolean | null>;
    deleteUser(id: string): Promise<boolean | null>;
}