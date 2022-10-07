import { AuthorizationError } from '../errors/auth-errors.js'


export const authorization = (validRoles = []) => {
    return async (request, response, next) => {
    
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
        } catch (error) {
            console.log(error.message)
            next(error)
        }
    }
}