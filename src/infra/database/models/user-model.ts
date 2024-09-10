/* eslint-disable max-len */
import {v4 as uuidv4} from "uuid";
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
   * @param {string} email
   * @param {string} password
   * @return {UserModel}
   */
  public static create(name: string, email: string, password: string) {
    return new UserModel({
      id: uuidv4(),
      name,
      email,
      password,
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
  public get email() {
    return this.props.email;
  }
  /**
   * @return {string}
   */
  public get password() {
    return this.props.password;
  }
}
