import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';

import express from 'express';

import { Server } from 'socket.io';


// libs

// our modules
import { router as publicRouter } from './routers/public-router.js';
import { router as privateRouter } from './routers/private-router.js';

import { appHandler } from './socket-handlers/app-handler.js';

import { authenticate } from './middlewares/authentication.js';

// App instance
const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer);

// Configurations app Level
app.use(express.json());

const __filename = fileURLToPath(import.meta.url); // ignore
const __dirname = dirname(__filename);
app.use("/static", express.static(join(__dirname, "public")))

app.set("view engine", "pug");
app.set("views", "./src/views")

// Middlewares

// Route handlers
// app.use("/", (req, res) => {
//     res.render("index")
// });

app.use("/public", publicRouter);
app.use("/private", authenticate, privateRouter);


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