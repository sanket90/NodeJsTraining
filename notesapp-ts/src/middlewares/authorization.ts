import { NextFunction, Request, Response } from 'express';
import { AuthorizationError } from '../errors/auth-errors'


export const authorization = (validRoles : string[] = []) => {
    return async (request: any, response: Response, next: NextFunction) => {
    
        try {
            // Authorization bearer <jwt token>
            if (!request.user) {
                // error
                console.log("Not Authenticated..!");
                throw new AuthorizationError();
            }
    
            if (request.user.role === "ADMIN") {
                next();
            } else if (validRoles.includes(request.user.role)) {
                next();
            } else {
                throw new AuthorizationError();
            }   
        } catch (error: any) {
            console.log(error.message)
            next(error)
        }
    }
}