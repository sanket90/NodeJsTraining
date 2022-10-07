import express from 'express';

import { router as usersRouter } from './user-router.js';


export const router = express.Router();

router.use("/users", usersRouter)