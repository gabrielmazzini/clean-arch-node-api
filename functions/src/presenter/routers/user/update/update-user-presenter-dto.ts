import {Birthdate} from "../../../../domain/objectsValue/Birthdate";
import {CPF} from "../../../../domain/objectsValue/Cpf";
import {Email} from "../../../../domain/objectsValue/Email";

export interface IUpdateUserInputPresenterDto {
  id: string;
  name: string;
  lastName: string;
  phone: number;
  birthdate: Birthdate;
  cpf: CPF;
  email: Email;
  creditCard: {
    cardNumber: string;
    cvv: number;
    expirationDate: string;
    holderName: string;
    holderCpf: CPF;
  };
  transationId?: string[];
  featuredImage: string;
  geoLocation: {
  latitude: string;
  longitude: string;
  };
}

export interface IUpdateUserOutputPresenterDto {
  status: boolean;
}
