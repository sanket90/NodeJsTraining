import { createServer } from 'node:http';
import { parse } from 'node:url';

import { HttpRouter } from './http-router.js';

export class Application {
    httpServer;
    httpRouter;

    constructor() {
        this.initRouter();
        this.initHttpServer();
    }

    initRouter() {
        this.httpRouter = new HttpRouter();
    }

    initHttpServer() {
        this.httpServer = createServer((request, response) => {
            this.handleRequest(request, response);
        });
    }

    handleRequest(httpRequest, httpResponse) {
        console.log("Incoming request :", httpRequest.url, httpRequest.method);
        const requestUrl = parse(httpRequest.url, true);

        // DO SOMETHING HERE
        // Check for static files in Public dir
        // Check for static files in Public Copy dir

        const requestHandler = this.httpRouter.handleRequest(requestUrl.pathname, httpRequest.method);
        httpResponse.writeHead(200, { 'Content-type': 'text/html' });
        return requestHandler(httpRequest, httpResponse, requestUrl.query);
    }

    startServer(port = 3300, hostname = "127.0.0.1", successFn) {
        this.httpServer.listen(port, hostname, successFn)
    }
}