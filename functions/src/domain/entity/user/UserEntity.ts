/* eslint-disable indent */
import crypto = require("node:crypto");
import {Email} from "../../objectsValue/Email";
import {CPF} from "../../objectsValue/Cpf";
import {Birthdate} from "../../objectsValue/Birthdate";
import {Userprops} from "./dto";
/**
 */
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
  /**
   * @param {string} id
   * @param {string} name
   * @param {Birthdate} birthdate
   * @param {CPF} cpf
   * @param {Email} email
   * @param {object} address
   * @param {string} typeUser
   */
  constructor({
    id,
    name,
    lastName,
    birthdate,
    cpf,
    email,
    address,
    typeUser,
  }: Userprops) {
    this._id = id;
    this._name = name;
    this._lastName = lastName;
    this._birthdate = birthdate;
    this._cpf = cpf;
    this._email = email;
    this._address = address;
    this._typeUser = typeUser;
  }
  /**
   * @param {string} name
   * @param {Birthdate} birthdate
   * @param {CPF} cpf
   * @param {Email} email
   * @param {object} address
   * @param {string} typeUser
   * @return {User}
   */
  public static create({
    name,
    lastName,
    birthdate,
    cpf,
    email,
    address,
    typeUser,
  }: Omit<Userprops, "id">): User {
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
  /**
   * @param {string} id
   * @param {string} name
   * @param {Birthdate} birthdate
   * @param {CPF} cpf
   * @param {Email} email
   * @param {object} address
   * @param {string} typeUser
   * @return {User}
   */
  public static with({
    id,
    name,
    lastName,
    birthdate,
    cpf,
    email,
    address,
    typeUser,
  }: Userprops): User {
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
  /**
   * @return {string}
   */
  public get id(): string {
    return this._id;
  }
  /**
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }
  /**
   * @return {string}
   */
  public get lastName(): string {
    return this._lastName;
  }
  /**
   * @return {Birthdate}
   */
  public get birthdate(): Birthdate {
    return this._birthdate;
  }
  /**
   * @return {CPF}
   */
  public get cpf(): CPF {
    return this._cpf;
  }
  /**
   * @return {Email}
   */
  public get email(): Email {
    return this._email;
  }
  /**
   * @return {string}
   */
  public get typeUser(): string {
    return this._typeUser;
  }
  /**
   * @return {object}
   */
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
