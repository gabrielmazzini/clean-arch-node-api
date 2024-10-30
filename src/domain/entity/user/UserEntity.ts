import crypto from "node:crypto";
import { Email } from "../../objectsValue/Email";
import { CPF } from "../../objectsValue/Cpf";
import { Birthdate } from "../../objectsValue/Birthdate";

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

export class User {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _lastName: string;
  private readonly _birthdate: Birthdate;
  private readonly _cpf: CPF;
  private readonly _email: Email;
  private readonly _address: {
    street: string;
    complement?: string;
    numberHome: string;
    district: string;
    state: string;
    city: string;
    country: string;
  };
  private readonly _typeUser: string;

  constructor({ id, name, lastName, birthdate, cpf, email, address, typeUser }: Userprops) {
    this._id = id;
    this._name = name;
    this._lastName = lastName;
    this._birthdate = birthdate;
    this._cpf = cpf;
    this._email = email;
    this._address = address;
    this._typeUser = typeUser;
  }

  public static create({name, lastName, birthdate, cpf, email, address, typeUser }: Omit<Userprops, "id">): User {
    return new User({
      id: crypto.randomUUID(),
      name,
      lastName,
      birthdate,
      cpf,
      email,
      address,
      typeUser,
    });
  }

  public static with({id, name, lastName, birthdate, cpf, email, address, typeUser}: Userprops): User {
    return new User({
      id,
      name,
      lastName,
      birthdate,
      cpf,
      email,
      address,
      typeUser,
    });
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get birthdate(): Birthdate {
    return this._birthdate;
  }

  public get cpf(): CPF {
    return this._cpf;
  }

  public get email(): Email {
    return this._email;
  }

  public get typeUser(): string {
    return this._typeUser;
  }

  public get address(): {
    street: string;
    complement?: string;
    numberHome: string;
    district: string;
    state: string;
    city: string;
    country: string;
  } {
    return this._address;
  }
}
