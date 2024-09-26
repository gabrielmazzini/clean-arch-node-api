import {User} from "../../../domain/entity/user/UserEntity";

export const data: Omit<User, "id"> = {
    name: "gabriel",
    lastName: "mazzini",
    dataNasc: "02/04/1992",
    cpf: 123213123123,
    email: "gabriel@teba.com",
    address: {
      street: "teste",
      numberHome: "teste1",
      district: "teste1",
      complement: "teste2",
      city: "teste",
      state: "teste",
      country: "teste",
    },
  };

export const data2: Omit<User, "id"> = {
    name: "gabriel2",
    lastName: "mazzini2",
    dataNasc: "02/04/1992",
    cpf: 123213123123,
    email: "gabriel@teba2.com",
    address: {
      street: "teste2",
      numberHome: "teste1",
      district: "teste1",
      complement: "teste2",
      city: "teste2",
      state: "teste2",
      country: "teste2",
    },
  };