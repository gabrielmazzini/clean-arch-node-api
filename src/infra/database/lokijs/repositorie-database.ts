import {User} from "../../../domain/entity/user/UserEntity";

 export interface ILokiDatabase {
    init(data: User, data2: User): void;
}