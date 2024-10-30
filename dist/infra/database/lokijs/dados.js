"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data2 = exports.data = void 0;
const Birthdate_1 = require("../../../domain/objectsValue/Birthdate");
const Cpf_1 = require("../../../domain/objectsValue/Cpf");
const Email_1 = require("../../../domain/objectsValue/Email");
const birthdateT = new Birthdate_1.Birthdate("1992/04/02");
const cpf = new Cpf_1.CPF("40596793804");
const email = new Email_1.Email("gabriel@teba.com");
exports.data = {
    name: "gabriel",
    lastName: "mazzini",
    birthdate: birthdateT,
    cpf: cpf,
    email: email,
    address: {
        street: "teste",
        numberHome: "teste1",
        district: "teste1",
        complement: "teste2",
        city: "teste",
        state: "teste",
        country: "teste",
    },
    typeUser: "admin"
};
exports.data2 = {
    name: "gabriel2",
    lastName: "mazzini2",
    birthdate: birthdateT,
    cpf: cpf,
    email: email,
    address: {
        street: "teste2",
        numberHome: "teste1",
        district: "teste1",
        complement: "teste2",
        city: "teste2",
        state: "teste2",
        country: "teste2",
    },
    typeUser: "user"
};
