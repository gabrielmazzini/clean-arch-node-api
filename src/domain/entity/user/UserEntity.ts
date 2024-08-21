/* eslint-disable max-len */
import {v4 as uuidv4} from "uuid";

export type userProps = {
  id: string;
  name: string;
  email: string;
  password: string;
}

/**
 */
export class User {
  /**
 * @param {userProps} props
 */
  private constructor(private props: userProps) {}

  /**
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @return {User}
   */
  public static create(name: string, email: string, password: string) {
    return new User({
      id: uuidv4(),
      name,
      email,
      password,
    });
  }
  /**
   * @param {userProps} userProps
   * @return {User}
   */
  public static with(userProps: userProps) {
    return new User(userProps);
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
