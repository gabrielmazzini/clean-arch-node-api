"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CPF = void 0;
const errors_1 = require("../../errors/errors");
class CPF {
    _cpf;
    constructor(cpf) {
        this._cpf = cpf.replace(/\D/g, '');
        if (!this.validadeCpf()) {
            throw new errors_1.ErrorInvalidCpf('Invalid CPF');
        }
        ;
    }
    ;
    validadeCpf() {
        if (this._cpf.length !== 11 || /^(\d)\1+$/.test(this._cpf)) {
            return false;
        }
        const calculateDigit = (cpf, fatorInicial) => {
            let total = 0;
            for (let i = 0; i < cpf.length; i++) {
                total += parseInt(cpf[i]) * fatorInicial--;
            }
            const resto = total % 11;
            return resto < 2 ? 0 : 11 - resto;
        };
        const digit1 = calculateDigit(this._cpf.slice(0, 9), 10);
        const digit2 = calculateDigit(this._cpf.slice(0, 9) + digit1, 11);
        return digit1 === parseInt(this._cpf[9]) && digit2 === parseInt(this._cpf[10]);
    }
    value() {
        return this._cpf;
    }
}
exports.CPF = CPF;
