import {User} from "../../../domain/entity/user/UserEntity";

 export interface LokiDatabase {
    init(data: User, data2: User): void;
}