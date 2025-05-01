/* eslint-disable indent */
import crypto = require("node:crypto");
import {Email} from "../../objectsValue/Email";
import {CPF} from "../../objectsValue/Cpf";
import {Birthdate} from "../../objectsValue/Birthdate";

export type Userprops = {
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
  geoLocation?: {
  latitude: string;
  longitude: string;
  };
  typeUser: string;
  createdAt: Date;
};

/**
 */
export class User {
  private readonly id: string;
  private readonly name: string;
  private readonly lastName: string;
  private readonly birthdate: Birthdate;
  private readonly phone: number;
  private readonly cpf: CPF;
  private readonly email: Email;
  private readonly creditCard: {
    cardNumber: string;
    cvv: number;
    expirationDate: string;
    holderName: string;
    holderCpf: CPF;
  };
  private readonly transationId?: string[];
  private readonly featuredImage: string;
  private readonly geoLocation?: {
    latitude: string;
    longitude: string;
  };
  private readonly createdAt: Date;
  private readonly typeUser: string;
  /**
   * @param {string} id
   * @param {string} name
   * @param {Birthdate} birthdate
   * @param {number} phone
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
    phone,
    cpf,
    email,
    creditCard,
    transationId,
    featuredImage,
    geoLocation,
    createdAt,
    typeUser,
  }: Userprops) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.phone = phone;
    this.cpf = cpf;
    this.email = email;
    this.creditCard = creditCard;
    this.transationId = transationId;
    this.featuredImage = featuredImage;
    this.geoLocation = geoLocation;
    this.createdAt = createdAt;
    this.typeUser = typeUser;
  }
  /**
   * @param {string} name
   * @param {string} lastName
   * @param {Birthdate} birthdate
   * @param {number} phone
   * @param {CPF} cpf
   * @param {Email} email
   * @param {object} creditCard
   * @param {string} featuredImage
   * @param {object} geoLocation
   * @param {string} typeUser
   * @return {User}
   */
  public static create({
    name,
    lastName,
    birthdate,
    phone,
    cpf,
    email,
    creditCard,
    featuredImage,
    geoLocation,
    typeUser,
  }: Omit<Userprops, "id" | "createdAt">): User {
    return new User({
      id: crypto.randomUUID(),
      name,
      lastName,
      birthdate,
      phone,
      cpf,
      email,
      creditCard,
      transationId: [],
      featuredImage,
      geoLocation,
      createdAt: new Date(),
      typeUser,
    });
  }
  /**
   * @param {string} id
   * @param {string} name
   * @param {Birthdate} birthdate
   * @param {number} phone
   * @param {CPF} cpf
   * @param {Email} email
   * @param {object} creditCard
   * @param {string} featuredImage
   * @param {object} geoLocation
   * @param {Date} createdAt
   * @param {string} typeUser
   * @return {User}
   */
  public static with({
    id,
    name,
    lastName,
    birthdate,
    phone,
    cpf,
    email,
    creditCard,
    transationId,
    featuredImage,
    geoLocation,
    createdAt,
    typeUser,
  }: Userprops): User {
    return new User({
      id,
      name,
      lastName,
      birthdate,
      phone,
      cpf,
      email,
      creditCard,
      transationId,
      featuredImage,
      geoLocation,
      createdAt,
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
  public get _creditCard(): {
    cardNumber: string;
    cvv: number;
    expirationDate: string;
    holderName: string;
    holderCpf: CPF;
  } {
    return this.creditCard;
  }
  /**
   * @return {string[]}
   */
  public get _transationId(): string[] | undefined {
    return this.transationId;
  }
  /**
   * @return {string}
   */
  public get _featuredImage(): string {
    return this.featuredImage;
  }
  /**
   * @return {object}
   */
  public get _geoLocation(): {
    latitude: string;
    longitude: string;
  } | undefined {
    return this.geoLocation;
  }
  /**
   * @return {number}
   */
  public get _phone(): number {
    return this.phone;
  }
  /**
   * @return {Date}
   */
  public get _createdAt(): Date {
    return this.createdAt;
  }
}
