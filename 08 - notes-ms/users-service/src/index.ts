import { createServer } from 'http';

import express from 'express';

import { Server } from 'socket.io';


// libs

// our modules
import { router as publicRouter } from './routers/public-router.js';

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

app.use("/public", publicRouter);


// Error handlers
app.use((error: any, request: any, response: any, next: any) => {
    const statusCode = error.statusCode || 500;
    response.status(statusCode);
    response.json(error);
})

httpServer.listen(process.env.HTTP_SERVER_PORT, () => {
    console.log(`Notes App Express server started successfully.! ${process.env.PROFILE} ${process.env.HTTP_SERVER_PORT}`);
});