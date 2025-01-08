import {ErrorInvalidCpf} from "../../errors/errors";
/**
 */
export class CPF {
  private readonly _cpf: string;
  /**
   * @param {string} cpf
   */
  constructor(cpf: string) {
    this._cpf = cpf.replace(/\D/g, "");
    if (!this.validadeCpf()) {
      throw new ErrorInvalidCpf("Invalid CPF");
    }
  }
  /**
   * @return {boolean}
   */
  private validadeCpf(): boolean {
    if (this._cpf.length !== 11 || /^(\d)\1+$/.test(this._cpf)) {
      return false;
    }
    const calculateDigit = (cpf: string, fatorInicial: number): number => {
      let total = 0;
      for (let i = 0; i < cpf.length; i++) {
        total += parseInt(cpf[i]) * fatorInicial--;
      }
      const resto = total % 11;
      return resto < 2 ? 0 : 11 - resto;
    };
    const digit1 = calculateDigit(this._cpf.slice(0, 9), 10);
    const digit2 = calculateDigit(this._cpf.slice(0, 9) + digit1, 11);
    return (
      digit1 === parseInt(this._cpf[9]) && digit2 === parseInt(this._cpf[10])
    );
  }
  /**
   * @return {string}
   */
  public value(): string {
    return this._cpf;
  }
}
