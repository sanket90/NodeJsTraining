import { parse } from 'node:url';

import { router } from './http-router.js';

router.register404Route((request, response) => {
    response.writeHead(404, { 'Content-type': 'text/html' });
    response.end("404 Not found");
})

router.register405Route((request, response) => {
    response.writeHead(405, { 'Content-type': 'text/html' });
    response.end("405 Invalid Method");
})

export class RequestDispatcher {

    static handleRequest(httpRequest, httpResponse) {
        console.log("Incoming request :", httpRequest.url, httpRequest.method);
        const requestUrl = parse(httpRequest.url, true);

        const requestHandler = router.handleRequest(requestUrl.pathname, httpRequest.method);
        httpResponse.writeHead(200, { 'Content-type': 'text/html' });
        return requestHandler(httpRequest, httpResponse);
    }
}