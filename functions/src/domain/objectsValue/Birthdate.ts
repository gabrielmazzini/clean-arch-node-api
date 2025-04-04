/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import {ErrorInvalidBirthdate} from "../../errors/errors";
/**
 */
export class Birthdate {
  private readonly date: Date;
  /**
   * @param {string} dataString
   */
  constructor(dataString: string) {
    const date = this.parseDate(dataString);
    if (!this.validateDate(date)) {
      throw new ErrorInvalidBirthdate("Invalid date of birth");
    }
    this.date = date;
  }
  /**
   * @param {string} dataString
   * @return {Date}
   */
  private parseDate(dataString: string): Date {
    const data = new Date(dataString);
    if (isNaN(data.getTime())) {
      throw new ErrorInvalidBirthdate("Invalid date format");
    }
    return data;
  }
  /**
   * @param {Date} date
   * @return {boolean}
   */
  private validateDate(date: Date): boolean {
    const today = new Date();
    if (date > today) {
      return false;
    }
    const ageMaximum = 105;
    const yearLimit = today.getFullYear() - ageMaximum;
    if (date.getFullYear() < yearLimit) {
      return false;
    }
    return true;
  }
  /**
   * @return {Date}
   */
  public value(): Date {
    return this.date;
  }
  /**
   * @param {string} format
   * @return {string}
   */
  public format(format: string = "dd/MM/yyyy"): string {
    const day = String(this.date.getDate()).padStart(2, "0");
    const month = String(this.date.getMonth() + 1).padStart(2, "0");
    const year = this.date.getFullYear();
    switch (format) {
      case "dd/MM/yyyy":
        return `${day}/${month}/${year}`;
      case "MM/dd/yyyy":
        return `${month}/${day}/${year}`;
      default:
        return `${year}-${month}-${day}`;
    }
  }
}
