"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Birthdate = void 0;
const errors_1 = require("../../erros/errors");
class Birthdate {
    _date;
    constructor(dataString) {
        const date = this.parseDate(dataString);
        if (!this.validateDate(date)) {
            throw new errors_1.ErrorInvalidBirthdate('Invalid date of birth');
        }
        this._date = date;
    }
    parseDate(dataString) {
        const data = new Date(dataString);
        if (isNaN(data.getTime())) {
            throw new errors_1.ErrorInvalidBirthdate('Invalid date format');
        }
        return data;
    }
    validateDate(date) {
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
    value() {
        return this._date;
    }
    format(format = 'dd/MM/yyyy') {
        const day = String(this._date.getDate()).padStart(2, '0');
        const month = String(this._date.getMonth() + 1).padStart(2, '0');
        const year = this._date.getFullYear();
        switch (format) {
            case 'dd/MM/yyyy':
                return `${day}/${month}/${year}`;
            case 'MM/dd/yyyy':
                return `${month}/${day}/${year}`;
            default:
                return `${year}-${month}-${day}`;
        }
    }
}
exports.Birthdate = Birthdate;
