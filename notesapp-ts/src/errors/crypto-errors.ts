import { BusinessError } from './business-errors'

export class CryptoError extends BusinessError {
    statusCode;
    constructor(message = "Crypto Exception Occurred.!", statusCode = 500, ) {
        super();
        this.name = "CryptoError"
        this.message = message;

        this.statusCode = statusCode;
    }
}


export class PasswordHashingFailure extends CryptoError {
    constructor(message = "Error while hashing password.!") {
        super(message);
    }
}