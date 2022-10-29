import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';

import express from 'express';

import { Server } from 'socket.io';


// libs

// our modules
import { router as privateRouter } from './routers/private-router.js';

import { appHandler } from './socket-handlers/app-handler.js';

import {  authenticate, hashPwd, HASH_ROUNDS } from 'notesapp-core-lib';

// App instance
const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer);

// Configurations app Level
app.use(express.json());


// Middlewares

// Route handlers
// app.use("/", (req, res) => {
//     res.render("index")
// });

// app.use("/private", authenticate(userService.tokenAuth), privateRouter);
app.use("/private", privateRouter);


// Error handlers
app.use((error: any, request: any, response: any, next: any) => {
    const statusCode = error.statusCode || 500;
    response.status(statusCode);
    response.json(error);
})


io.on("connection", appHandler(io))



httpServer.listen(process.env.HTTP_SERVER_PORT, () => {
    console.log(`Notes App Express server started successfully.! ${process.env.PROFILE} ${process.env.HTTP_SERVER_PORT}`);
});