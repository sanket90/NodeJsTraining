import express from 'express';
export const router = express.Router();



router.get("/", (request, response, next) => {
    try {
        response.render("index")
    } catch (error) {
        next(error)
    }
});

router.get("/new", (request, response, next) => {
    try {
        response.render("note_details", { title: "NEW_NOTE" })
    } catch (error) {
        next(error)
    }
});

router.get("/:title", (request, response, next) => {
    try {
        response.render("note_details", { title: request.params.title })
    } catch (error) {
        next(error)
    }
});