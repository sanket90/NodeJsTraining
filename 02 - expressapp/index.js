import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';


// libs

// our modules
import { router as greetRouter } from './greet.js'
import { router as userRouter } from './users.js'
import { requsetLogger, responseLogger } from './logger.js';

// App instance
const app = express();

// Configurations app Level
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// http://locahost:3400/static/images/logo.png
app.use("/static", express.static(join(__dirname, "public")))

// Middlewares
// app.use(requsetLogger);

// Route handlers
app.use("/", greetRouter)
app.use("/users", userRouter)


// app.use(responseLogger)

// Error handlers


app.listen(3400, () => {
    console.log("Express server started successfully.!");
});