/* eslint-disable max-len */
import { Birthdate } from "../../objectsValue/Birthdate";
import { CPF } from "../../objectsValue/Cpf";
import { Email } from "../../objectsValue/Email";
import {IServiceProviderDTO} from "./serviceProvider-dto";
import crypto = require("node:crypto");
/**
 */
export default class ServiceProvider {
  private readonly id: string;
  private readonly name: string;
  private readonly lastName: string;
  private readonly birthdate: Birthdate;
  private readonly cpf: CPF;
  private readonly email: Email;
  private readonly phone: number;
  private readonly bankAccount: {
    bank: string;
    agency: string;
    account: string;
    accountType: string;
    accountHolder: string;
  };
  private readonly featuredImage: string;
  private readonly portfolio?: string[];
  private readonly address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  private readonly reviews?: number[];
  private readonly typeOfService: string;
  private readonly transationsID?: string[];
  private readonly companyID?: string;
  private readonly openingHours: string;
  private readonly socialMedia?: string[];
  private readonly createdAt: Date;
  private readonly typeUser: string;
  /**
   * @param {string} id
   * @param {string} name
   * @param {string} lastName
   * @param {Birthdate} birthdate
   * @param {CPF} cpf
   * @param {Email} email
   * @param {number} phone
   * @param {object} bankAccount
   * @param {string} featuredImage
    * @param {string[]} portfolio
    * @param {object} address
    * @param {number[]} reviews
    * @param {string} typeOfService
    * @param {string[]} transationsID
    * @param {string} companyID
    * @param {string} openingHours
    * @param {string[]} socialMedia
    * @param {Date} createdAt
    * @param {string} typeUser
   */
  constructor({id, name, lastName, birthdate, cpf, email, phone, 
    bankAccount, featuredImage, portfolio, address, reviews,
    typeOfService, transationsID, companyID, 
    openingHours, socialMedia, createdAt, typeUser
  }: IServiceProviderDTO) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.birthdate = birthdate;
    this.cpf = cpf;
    this.email = email;
    this.phone = phone;
    this.bankAccount = bankAccount;
    this.featuredImage = featuredImage;
    this.portfolio = portfolio;
    this.address = address;
    this.reviews = reviews;
    this.typeOfService = typeOfService;
    this.transationsID = transationsID;
    this.companyID = companyID;
    this.openingHours = openingHours;
    this.socialMedia = socialMedia;
    this.createdAt = createdAt;
    this.typeUser = typeUser;
  }
  /**
    * @param {string} name
    * @param {string} lastName
    * @param {Birthdate} birthdate
    * @param {CPF} cpf
    * @param {Email} email
    * @param {number} phone
    * @param {object} bankAccount
    * @param {string} featuredImage
    * @param {string[]} portfolio
    * @param {string} address
    * @param {number[]} reviews
    * @param {string} typeOfService
    * @param {string[]} transationsID
    * @param {string} companyID
    * @param {string} openingHours
    * @param {string[]} socialMedia
    * @param {Date} createdAt
    * @param {string} typeUser
   * @return {ServiceProvider}
   */
  public static create({
    name, lastName, birthdate, cpf, email, phone, bankAccount, featuredImage, portfolio,
    address, reviews, typeOfService, transationsID, companyID,
    openingHours, socialMedia, typeUser
  }: Omit<IServiceProviderDTO, "id" | "createdAt">): ServiceProvider {
    return new ServiceProvider({
      id: crypto.randomUUID(),
      name,
      lastName,
      birthdate,
      cpf,
      email,
      phone,
      bankAccount,
      featuredImage,
      portfolio: portfolio || [],
      address,
      reviews: reviews || [],
      typeOfService,
      transationsID: transationsID || [],
      companyID: companyID || "",
      openingHours,
      socialMedia: socialMedia || [],
      createdAt: new Date(),
      typeUser
    });
  }
  /**
   * @param {string} id
   * @param {string} name
   * @param {string} lastName
   * @param {Birthdate} birthdate
   * @param {CPF} cpf
   * @param {Email} email
   * @param {number} phone
   * @param {object} bankAccount
   * @param {string} featuredImage
   * @param {string[]} portfolio
   * @param {string} address
   * @param {number[]} reviews
   * @param {string[]} typeOfService
   * @param {string[]} transationsID
   * @param {string} companyID
   * @param {string[]} openingHours
   * @param {string[]} socialMedia
   * @param {Date} createdAt
   * @param {string} typeUser
   */
  public static with({
    id,
    name,
    lastName,
    birthdate,
    cpf,
    email,
    phone,
    bankAccount,
    featuredImage,
    portfolio,
    address,
    reviews,
    typeOfService,
    transationsID,
    companyID,
    openingHours,
    socialMedia,
    createdAt,
    typeUser,
  }: IServiceProviderDTO): ServiceProvider {
    return new ServiceProvider({
      id,
      name,
      lastName,
      birthdate,
      cpf,
      email,
      phone,
      bankAccount,
      featuredImage,
      portfolio,
      address,
      reviews,
      typeOfService,
      transationsID,
      companyID,
      openingHours,
      socialMedia,
      createdAt,
      typeUser
    });
  }
  /**
   * @param {string} id
   */
  public get _id(): string {
    return this.id;
  }
  /**
   * @param {string} name
   */
  public get _name(): string {
    return this.name;
  }
  /**
   * @param {string} lastName
   */
  public get _lastName(): string {
    return this.lastName;
  }
  /**
   * @param {Birthdate} birthdate
   */
  public get _birthdate(): Birthdate {
    return this.birthdate;
  }
  /**
   * @param {CPF} cpf
   */
  public get _cpf(): CPF {
    return this.cpf;
  }
  /**
   * @param {Email} email
   */
  public get _email(): Email {
    return this.email;
  }
  /**
   * @param {number} phone
   */
  public get _phone(): number {
    return this.phone;
  }
  /**
   * @param {object} bankAccount
   */
  public get _bankAccount(): {
    bank: string;
    agency: string;
    account: string;
    accountType: string;
    accountHolder: string;
  } {
    return this.bankAccount;
  }
    /**
   * @param {string} featuredImage
   */
    public get _featuredImage(): string {
      return this.featuredImage;
    }
  /**
   * @param {string[]} portfolio
   * */
  public get _portfolio(): string[] | undefined {
    return this.portfolio;
  }
  /**
   * @param {object} address
   */
  public get _address(): object {
    return this.address;
  }
  /**
   * @param {number[]} reviews
   */
  public get _reviews(): number[] | undefined {
    return this.reviews;
  }
  /**
   * @param {string} typeOfService
   */
  public get _typeOfService(): string {
    return this.typeOfService;
  }
  /**
   * @param {string[]} transationsID
   * */
  public get _transationsID(): string[] | undefined {
    return this.transationsID;
  }
  /**
   * @param {string} companyID
   * */
  public get _companyID(): string | undefined {
    return this.companyID;
  }
  /**
   * @param {string} openingHours
   * */
  public get _openingHours(): string {
    return this.openingHours;
  }
  /**
   * @param {string[]} socialMedia
   * */
  public get _socialMedia(): string[] | undefined {
    return this.socialMedia;
  }
  /**
   * @param {Date} createdAt
   * */
  public get _createdAt(): Date {
    return this.createdAt;
  }
  /**
   * @param {string} typeUser
   * */
  public get _typeUser(): string {
    return this.typeUser;
  }
}
