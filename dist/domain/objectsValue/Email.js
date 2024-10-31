"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const errors_1 = require("../../errors/errors");
class Email {
    _email;
    constructor(email) {
        this._email = email;
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regexEmail.test(this._email)) {
            throw new errors_1.ErrorInvalidEmail(`Invalid email`);
        }
    }
    value() {
        return this._email;
    }
}
exports.Email = Email;
