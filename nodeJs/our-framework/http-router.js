
export const HTTP_METHOD_GET = "GET";
export const HTTP_METHOD_POST = "POST";
export const HTTP_METHOD_DELETE = "DELETE";
export const HTTP_METHOD_PUT = "PUT";

export const HTTP_STATUS_OK = "200";
export const HTTP_STATUS_NOT_FOUND = "404";
export const HTTP_STATUS_METHOD_NOT_ALLOWED = "405";

export class HttpRouter {
    pathHandlers = new Map();
    errorHandlers = new Map();

    registerGet(path, requestHandlerFn) {
        this.registerRoute(path, requestHandlerFn, HTTP_METHOD_GET);
    }

    registerPost(path, requestHandlerFn) {
        this.registerRoute(path, requestHandlerFn, HTTP_METHOD_POST);
    }

    registerPut(path, requestHandlerFn) {
        this.registerRoute(path, requestHandlerFn, HTTP_METHOD_PUT);
    }

    registerDelete(path, requestHandlerFn) {
        this.registerRoute(path, requestHandlerFn, HTTP_METHOD_DELETE);
    }

    registerRoute(path, requestHandlerFn, method = HTTP_METHOD_GET) {
        let methodHandler = this.pathHandlers.get(path);
        if (!methodHandler) {
            methodHandler = new Map();
        } 
        
        methodHandler.set(method, requestHandlerFn);
        this.pathHandlers.set(path, methodHandler);
    }

    registerErrorRoute(requestHandlerFn, status = HTTP_STATUS_NOT_FOUND) {
        this.errorHandlers.set(status, requestHandlerFn);
    }

    register404Route(requestHandlerFn) {
        this.registerErrorRoute(requestHandlerFn, HTTP_STATUS_NOT_FOUND);
    }

    register405Route(requestHandlerFn) {
        this.registerErrorRoute(requestHandlerFn, HTTP_STATUS_METHOD_NOT_ALLOWED);
    }

    setHttpStatus(status, callbackFn) {
        return (request, response, queryObj) => {
            response.writeHead(status, {'Content-type': 'text/html'});
            callbackFn(request, response, queryObj);
        }
    }

    handlerHttpError(errorCode, errorPath, defaultHandler) {
        if (this.errorHandlers.has(errorPath)) {
            return this.setHttpStatus(errorCode, this.errorHandlers.get(errorPath));
        } else {
            return this.setHttpStatus(errorCode, defaultHandler)
        }
    }

    handleRequest(path, method) {
        if (this.pathHandlers.has(path)) {

            const methodHandler = this.pathHandlers.get(path);
            
            if (methodHandler.has(method)) {
                return this.setHttpStatus(200, methodHandler.get(method));
            } else {
                return this.handlerHttpError(405, HTTP_STATUS_METHOD_NOT_ALLOWED, (request, response) => {
                    response.end("405  Default Method not allowed.!");
                })
            }
        }

        return this.handlerHttpError(404, HTTP_STATUS_NOT_FOUND, (request, response) => {
            response.end("404 Default Not Found.!");
        })
    }
}
