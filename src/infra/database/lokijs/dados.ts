import {User} from "../../../domain/entity/user/UserEntity";
import {Birthdate} from "../../../domain/objectsValue/Birthdate";
import {CPF} from "../../../domain/objectsValue/Cpf";
import {Email} from "../../../domain/objectsValue/Email";

const birthdateT = new Birthdate("1992/04/02");
const cpf = new CPF("40596793804");
const email = new Email("gabriel@teba.com")

export const data: Omit<User, "id"> = {
    name: "gabriel",
    lastName: "mazzini",
    birthdate: birthdateT,
    cpf: cpf,
    email: email,
    address: {
      street: "teste",
      numberHome: "teste1",
      district: "teste1",
      complement: "teste2",
      city: "teste",
      state: "teste",
      country: "teste",
    },
    typeUser: "admin"
  };

export const data2: Omit<User, "id"> = {
    name: "gabriel2",
    lastName: "mazzini2",
    birthdate: birthdateT,
    cpf: cpf,
    email: email,
    address: {
      street: "teste2",
      numberHome: "teste1",
      district: "teste1",
      complement: "teste2",
      city: "teste2",
      state: "teste2",
      country: "teste2",
    },
    typeUser: "user"
  };