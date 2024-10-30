import {CreateUserUseCase} from "../../../usecase/user/create-user/create-user-usecase";
import {User} from "../../../domain/entity/user/UserEntity";
import {LokiDatabase} from "./repositorie-database";
import Loki from "lokijs"
import {GetAllUsersUsecase} from "../../../usecase/adm/listAllUsers/listAllUsersUsecase";

export class Database implements LokiDatabase {
    private constructor(
        readonly createUserUseCase: CreateUserUseCase, 
        readonly getAllUsersUsecase: GetAllUsersUsecase) {}

    public static create(createUserUseCase: CreateUserUseCase, getAllUsersUsecase: GetAllUsersUsecase): Database {
        return new Database(createUserUseCase, getAllUsersUsecase);
    }

    public static getInstance():Loki {
      const db = new Loki("database", {});
      return db;
    }
  
    async init(data: Omit<User, "id">, data2: Omit<User, "id">) {
      try {
        await Promise.all([
          User.create({
            name: data.name,
            lastName: data.lastName,
            birthdate: data.birthdate,
            cpf: data.cpf,
            email: data.email,
            address: data.address,
            typeUser: data.typeUser
          }),
          User.create({
            name: data2.name,
            lastName: data2.lastName,
            birthdate: data2.birthdate,
            cpf: data2.cpf,
            email: data2.email,
            address: data2.address,
            typeUser: data2.typeUser
          }),
        ].map(this.createUserUseCase.execute.bind(this.createUserUseCase)));
        const users = await this.getAllUsersUsecase.execute()
        console.log("users", JSON.stringify(users, null, 2));
      } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
      }
    }
  }
