import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';

import express from 'express';

import { Server } from 'socket.io';


// libs

// our modules
import { router as publicRouter } from './src/routers/public-router.js';
import { router as privateRouter } from './src/routers/private-router.js';

import { appHandler } from './src/socket-handlers/app-handler.js';

import { authenticate } from './src/middlewares/authentication.js';

// App instance
const app = express();
const httpServer = createServer(app)
const io = new Server(httpServer);

// Configurations app Level
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
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
app.use((error, request, response, next) => {
    const statusCode = error.statusCode || 500;
    response.status(statusCode);
    response.json(error);
})


io.on("connection", appHandler(io))



httpServer.listen(3400, () => {
    console.log("Notes App Express server started successfully.!");
});