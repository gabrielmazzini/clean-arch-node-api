import {ErrorInvalidEmail} from "../../errors/errors";
/**
 */
export class Email {
  private readonly _email: string;
  /**
   * @param {string} email
   */
  constructor(email: string) {
    this._email = email;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regexEmail.test(this._email)) {
      throw new ErrorInvalidEmail("Invalid email");
    }
  }
  /**
   * @return {string}
   */
  public value(): string {
    return this._email;
  }
}
