import { Birthdate } from "../../objectsValue/Birthdate";
import { CPF } from "../../objectsValue/Cpf";
import { Email } from "../../objectsValue/Email";

export type Userprops = {
    id: string;
    name: string;
    lastName: string;
    birthdate: Birthdate;
    cpf: CPF;
    email: Email;
    address: {
      street: string;
      complement?: string;
      numberHome: string;
      district: string;
      state: string;
      city: string;
      country: string;
    };
    typeUser: string;
  };