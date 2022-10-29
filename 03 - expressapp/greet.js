import express from 'express';

export const router = express.Router();


router.get("/", (request, response) => {
    response.send("Hello..!");
});


router.all("/greet", (req, res, next) => {
    res.send("This is common response to all method");
    next();
});

// http://locahost:3400/hello
// http://locahost:3400/hesaidhello
router.get("/he*llo", (request, response) => {
    response.send("Hello..!");
});

// http://locahost:3400/hello
// http://locahost:3400/heello
// http://locahost:3400/heeeeeello
router.get("/he+llo", (request, response) => {
    response.send("Hello..!");
});

router.get(/[0-9][a-z]a/, (request, response) => {
    response.send("Hello..!");
});