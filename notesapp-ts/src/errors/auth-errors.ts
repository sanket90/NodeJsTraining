import { BusinessError } from './business-errors'

export class AuthenticationError extends BusinessError {
    constructor(message = "Authentication failed. Invalid user or password") {
        super(message, 401);
    }
}


export class AuthorizationError extends BusinessError {
    constructor(message = "Authorization failed. Not enough permission") {
        super(message, 403);
    }
}