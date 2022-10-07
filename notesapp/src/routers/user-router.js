import express from 'express';

import { UsersService } from '../services/users-service.js';

export const router = express.Router();
const usersService = new UsersService();


router.post("/register", async (request, response, next) => {
    try {
        const body = request.body;
        await usersService.save(body.name, body.email, body.password, body.role)
        response.json({message});
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (request, response, next) => {
    try {
        const body = request.body;
        const user = await usersService.authenticate(body.email, body.password)
        response.json(user);
    } catch (error) {
        next(error);
    }
});