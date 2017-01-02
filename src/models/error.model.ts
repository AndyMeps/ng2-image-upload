import { ErrorType } from '../enums';

export class Error {
    public type: ErrorType;
    public message: string;

    constructor(type: ErrorType, message: string) {
        this.type = type;
        this.message = message;
    }
}
