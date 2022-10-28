import { BusinessError } from './business-errors.js'

export class DatabaseError extends BusinessError {
    constructor(error: any) {
        super();
        this.name = "DatabaseError"
        this.message = error.message;
        this.stack = error.stack;
    }
}