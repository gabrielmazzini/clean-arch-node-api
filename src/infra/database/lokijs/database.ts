import {CreateUserUseCase} from "../../../usecase/user/create-user/create-user-usecase";
import {UserModel} from "../models/user-model";
import {GetUserUsecase} from "../../../usecase/user/list-user/list-user-usecase";
import {User} from "../../../domain/entity/user/UserEntity";
import {LokiDatabase} from "./repositorie-database";
import Loki from "lokijs"

export class Database implements LokiDatabase {
    private constructor(
        readonly createUserUseCase: CreateUserUseCase, 
        readonly getUserUseCase: GetUserUsecase) {}

    public static create(createUserUseCase: CreateUserUseCase, getUserUseCase: GetUserUsecase): Database {
        return new Database(createUserUseCase, getUserUseCase);
    }

    public static getInstance():Loki {
      const db = new Loki("database", {});
      return db;
    }
  
    async init(data: Omit<User, "id">, data2: Omit<User, "id">) {
      try {
        await Promise.all([
          UserModel.create(
            data.name,
            data.lastName,
            data.dataNasc,
            data.cpf,
            data.email,
            data.address
          ),
          UserModel.create(
            data2.name,
            data2.lastName,
            data2.dataNasc,
            data2.cpf,
            data2.email,
            data2.address
          ),
        ].map(this.createUserUseCase.execute.bind(this.createUserUseCase)));

        const users = await this.getUserUseCase.execute();
        console.log("users", users);

      } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
      }
    }
  }
