import { readFile } from 'node:fs';
import { join as pathJoin, extname, normalize, resolve } from 'node:path';

import { Application } from './application.js';

const app = new Application();

app.httpRouter.registerGet("/greet", (request, response, queryObj) => {

    console.log(queryObj.q);

    response.write("Hello World.!");
    response.end();
});

app.httpRouter.registerGet("/templates", (request, response, queryObj) => {
    const directory = "./templates";
    const file = queryObj.file;

    const root = normalize(resolve(directory))

    const allowedExt = ["html", "js"]

    const requestedExt = extname(file).slice(1);
    const isTypeValid = allowedExt.includes(requestedExt);

    if (!isTypeValid) {
        // return error
        response.writeHead(400, {'Content-type': 'text/html'});
        response.write("Invalid File extention.!");
        response.end();
        return;
    }

    const filePath = pathJoin(root, file);
    

    readFile(filePath, (err, data) => {
        if (!!err) {
            // return error
            response.writeHead(404, {'Content-type': 'text/html'});
            response.write("File Not found.!");
            response.end();
            return;
        } else {
            response.write(data);
            response.end();
        }
    })
});


app.startServer(3300, "127.0.0.1", () => {
    console.log(`Application Server started at http://localhost:3300`);
});