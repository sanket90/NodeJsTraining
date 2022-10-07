import express from 'express';

// libs

// our modules
import { router as publicRouter } from './src/routers/public-router.js';
import { router as privateRouter } from './src/routers/private-router.js';

import { authenticate } from './src/middlewares/authentication.js';

// App instance
const app = express();

// Configurations app Level
app.use(express.json());

// Middlewares

// Route handlers
app.use("/public", publicRouter);
app.use("/private", authenticate, privateRouter);


// Error handlers
app.use((error, request, response, next) => {
    const statusCode = error.statusCode || 500;
    response.status(statusCode);
    response.json(error);
})


app.listen(3400, () => {
    console.log("Notes App Express server started successfully.!");
});