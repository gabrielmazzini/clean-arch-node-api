import {Birthdate} from "../../../domain/objectsValue/Birthdate";
import {CPF} from "../../../domain/objectsValue/Cpf";
import {Email} from "../../../domain/objectsValue/Email";

export interface CreateUserInputDto {
  name: string;
  lastName: string;
  birthdate: Birthdate;
  cpf: CPF;
  email: Email;
  address: {
    street: string;
    numberHome: string;
    district: string;
    complement?: string;
    state: string;
    city: string;
    country: string;
  };
  typeUser: string;
}

export interface CreateUserOutputDto {
  message: string;
  id: string;
}
