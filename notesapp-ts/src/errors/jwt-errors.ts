import { BusinessError } from './business-errors'

export class JWTError extends BusinessError {
    statusCode;
    constructor(message = "Token Exception Occurred.!", statusCode = 500, ) {
        super();
        this.name = "JWTError"
        this.message = message;

        this.statusCode = statusCode;
    }
}


export class TokenSigningFailure extends JWTError {
    constructor(message = "Error while jwt token sign!") {
        super(message);
    }
}


export class TokenVerificationFailure extends JWTError {
    constructor(message = "Error while jwt token verify!") {
        super(message);
    }
}