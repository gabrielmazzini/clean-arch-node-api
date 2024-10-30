"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
class User {
    _id;
    _name;
    _lastName;
    _birthdate;
    _cpf;
    _email;
    _address;
    _typeUser;
    constructor({ id, name, lastName, birthdate, cpf, email, address, typeUser }) {
        this._id = id;
        this._name = name;
        this._lastName = lastName;
        this._birthdate = birthdate;
        this._cpf = cpf;
        this._email = email;
        this._address = address;
        this._typeUser = typeUser;
    }
    static create({ name, lastName, birthdate, cpf, email, address, typeUser }) {
        return new User({
            id: node_crypto_1.default.randomUUID(),
            name,
            lastName,
            birthdate,
            cpf,
            email,
            address,
            typeUser,
        });
    }
    static with({ id, name, lastName, birthdate, cpf, email, address, typeUser }) {
        return new User({
            id,
            name,
            lastName,
            birthdate,
            cpf,
            email,
            address,
            typeUser,
        });
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get lastName() {
        return this._lastName;
    }
    get birthdate() {
        return this._birthdate;
    }
    get cpf() {
        return this._cpf;
    }
    get email() {
        return this._email;
    }
    get typeUser() {
        return this._typeUser;
    }
    get address() {
        return this._address;
    }
}
exports.User = User;
