import {ErrorInvalidEmail} from "../../erros/errors";

export class Email {
    private readonly _email: string

    constructor(email: string) {
        this._email = email;
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regexEmail.test(this._email)) {
            throw new ErrorInvalidEmail(`Invalid email`);
        }
    }

    public value(): string {
        return this._email;
    }
}