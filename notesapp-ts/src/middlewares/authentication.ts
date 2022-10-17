import { UsersService } from "../services/users-service";

import { AuthenticationError } from '../errors/auth-errors'
import { NextFunction, Request, RequestHandler, Response } from "express";
import { User } from "../domain/user-entity";

const userService = new UsersService();

export const authenticate = async (request: Request|any, response: Response, next: NextFunction) => {
    
    try {
        // Authorization bearer <jwt token>
        if (!(request.headers 
            && request.headers.authorization
            && request.headers.authorization.split(" ").length === 2)) {
            // error
            console.log("Invalid token.!");
            throw new AuthenticationError();
        }

        const requestJwt = request.headers.authorization.split(" ")[1];

        const user = await userService.tokenAuth(requestJwt);

        request.user = user as User;

        next();
    } catch (error: any) {
        console.log(error.message)
        next(error)
    }
}