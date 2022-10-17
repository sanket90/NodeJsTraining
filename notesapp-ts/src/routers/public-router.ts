import express from 'express';

import { router as usersRouter } from './user-router';
import { router as notePageRouter } from './notes-page-router';


export const router = express.Router();

router.use("/users", usersRouter)
router.use("/notes", notePageRouter)