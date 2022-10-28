import { UsersService } from "../services/users-service.js";

import { AuthenticationError } from '../errors/auth-errors.js'

const userService = new UsersService();

export const authenticate = async (request, response, next) => {
    
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

        request.user = user;

        next();
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}