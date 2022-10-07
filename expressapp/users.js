import express from 'express';

export const router = express.Router();

import { requsetLogger, responseLogger } from './logger.js';

import { MessageResponse, convertToString } from './message.js';


router.use(requsetLogger);

router.get("/", (request, response, next) => {
    const respObj = new MessageResponse("200", "User LIST []");
    response.json(respObj)

    next();
});

router.post("", (request, response) => {
    console.log(request.body);

    const respObj = new MessageResponse("200", "User saved successfully.!");
    
    response.json(respObj);
});

router.get("/:userId", (request, response) => {
    response.send(`A user Details with id ${request.params.userId}`);
});

router.put("/:userId", (request, response) => {
    response.send(`A user Updated with id ${request.params.userId}`);
});

router.delete("/:userId", (request, response) => {
    response.send(`A user Deleted with id ${request.params.userId}`);
});
