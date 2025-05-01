import { Birthdate } from "../../objectsValue/Birthdate";
import { CPF } from "../../objectsValue/Cpf";
import { Email } from "../../objectsValue/Email";

export interface IServiceProviderDTO {
  id: string;
  name: string;
  lastName: string;
  birthdate: Birthdate;
  cpf: CPF;
  email: Email;
  phone: number;
  bankAccount: {
    bank: string;
    agency: string;
    account: string;
    accountType: string;
    accountHolder: string;
  };
  featuredImage: string;
  portfolio?: string[];
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  reviews?: number[];
  typeOfService: string;
  transationsID?: string[];
  companyID?: string;
  openingHours: string;
  socialMedia?: string[];
  createdAt: Date;
  typeUser: string;
}
