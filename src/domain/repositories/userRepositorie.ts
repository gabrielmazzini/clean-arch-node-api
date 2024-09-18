import { UserModel } from "../../infra/database/models/user-model";
export interface IUserRepository {
    fyndByEmail(email: string): Promise<object | null>;
    save(user: UserModel): Promise<void>;
    getInfoUser(id: string): Promise<UserModel | null>;
    updateUser(id: string, input: Omit<UserModel, "id">): Promise<boolean | null>;
    deleteUser(id: string): Promise<boolean | null>;
}