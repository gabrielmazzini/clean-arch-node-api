/* eslint-disable max-len */
import crypto from "node:crypto"
import {User} from "../../../domain/entity/user/UserEntity";
/**
 */
export class UserModel {
  /**
 * @param {userProps} props
 */
  private constructor(private props: User) {}

  /**
   * @param {string} name
   * @param {string} lastName
   * @param {string} dataNasc
   * @param {number} cpf
   * @param {string} email
   * @param {object} address
   * @return {UserModel}
   */
  public static create(
    name: string, lastName: string, dataNasc: string, cpf: number, email: string,
    address: {
      street: string,
      numberHome: string,
      district: string,
      state: string,
      city: string,
      country: string,
    }) {
    return new UserModel({
      id: crypto.randomUUID(),
      name,
      lastName,
      dataNasc,
      cpf,
      email,
      address
      ,
    });
  }
  /**
   * @param {userProps} userProps
   * @return {UserModel}
   */
  public static with(userProps: User) {
    return new UserModel(userProps);
  }
  /**
   * @return {string}
   */
  public get id() {
    return this.props.id;
  }
  /**
   * @return {string}
   */
  public get name() {
    return this.props.name;
  }
  /**
   * @return {string}
   */
    public get lastName() {
    return this.props.lastName;
  }
  /**
   * @return {string}
   */
  public get dataNasc() {
    return this.props.dataNasc;
  }
  /**
   * @return {string}
   */
  public get cpf() {
    return this.props.cpf;
  }
  /**
   * @return {string}
   */
  public get email() {
    return this.props.email;
  }
  /**
   * @return {object}
   */
    public get address() {
      return this.props.address;
    }
}
