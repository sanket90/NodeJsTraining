
/** @type {import("express").RequestHandler} */
export const requsetLogger = (request, response, next) => {
    console.log(`REQUEST : ${request.url}`);
    
    next();
}

/** @type {import("express").RequestHandler} */
export const responseLogger = (request, response, next) => {
    console.log(`RESPONSE : ${response.statusCode}`);
    
    next();
}