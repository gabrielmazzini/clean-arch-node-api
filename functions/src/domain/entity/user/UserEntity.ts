/* eslint-disable indent */
import crypto = require("node:crypto");
import {Email} from "../../objectsValue/Email";
import {CPF} from "../../objectsValue/Cpf";
import {Birthdate} from "../../objectsValue/Birthdate";
import {Userprops} from "./dto";
/**
 */
export class User {
  private readonly id: string;
  private readonly name: string;
  private readonly lastName: string;
  private readonly birthdate: Birthdate;
  private readonly cpf: CPF;
  private readonly email: Email;
  private readonly address: {
    street: string;
    complement?: string;
    numberHome: string;
    district: string;
    state: string;
    city: string;
    country: string;
  };
  private readonly typeUser: string;
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
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.cpf = cpf;
    this.email = email;
    this.address = address;
    this.typeUser = typeUser;
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
  public get _id(): string {
    return this.id;
  }
  /**
   * @return {string}
   */
  public get _name(): string {
    return this.name;
  }
  /**
   * @return {string}
   */
  public get _lastName(): string {
    return this.lastName;
  }
  /**
   * @return {Birthdate}
   */
  public get _birthdate(): Birthdate {
    return this.birthdate;
  }
  /**
   * @return {CPF}
   */
  public get _cpf(): CPF {
    return this.cpf;
  }
  /**
   * @return {Email}
   */
  public get _email(): Email {
    return this.email;
  }
  /**
   * @return {string}
   */
  public get _typeUser(): string {
    return this.typeUser;
  }
  /**
   * @return {object}
   */
  public get _address(): {
    street: string;
    complement?: string;
    numberHome: string;
    district: string;
    state: string;
    city: string;
    country: string;
  } {
    return this.address;
  }
}
