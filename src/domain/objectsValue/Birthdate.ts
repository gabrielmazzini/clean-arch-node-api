import { ErrorInvalidBirthdate } from "../../errors/errors";

export class Birthdate {
    private readonly _date: Date;

    constructor(dataString: string) {
        const date = this.parseDate(dataString);
        if (!this.validateDate(date)) {
            throw new ErrorInvalidBirthdate('Invalid date of birth');
        }
        this._date = date;
    }

    private parseDate(dataString: string): Date {
        const data = new Date(dataString);
        if (isNaN(data.getTime())) {
            throw new ErrorInvalidBirthdate('Invalid date format');
        }
        return data;
    }

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

    public value(): Date {
        return this._date;
    }

    public format(format: string = 'dd/MM/yyyy'): string {
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
