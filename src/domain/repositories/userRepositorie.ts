import {UserModel} from "../../infra/database/models/user-model";
export interface IUserRepository {
    // fyndByEmail(email: string): Promise<object | null>;
    create(user: UserModel): Promise<object>;
    list(): Promise<UserModel[]>;
    // updateUser(id: string, input: Omit<UserModel, "id">): Promise<boolean | null>;
    // deleteUser(id: string): Promise<boolean | null>;
}