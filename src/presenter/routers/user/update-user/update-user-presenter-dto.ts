import { Birthdate } from "../../../../domain/objectsValue/Birthdate";
import { CPF } from "../../../../domain/objectsValue/Cpf";
import { Email } from "../../../../domain/objectsValue/Email";

export interface UpdateUserInputPresenterDto {
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
}

export interface UpdateUserOutputPresenterDto {
    message: string;
    status: boolean;
}