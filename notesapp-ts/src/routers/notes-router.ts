import express from 'express';
import { BusinessError } from '../errors/business-errors.js';
import { authorization } from '../middlewares/authorization.js';

import { NotesService } from '../services/notes-service.js';

export const router = express.Router();
const noteService = new NotesService();

router.get("/", authorization(["EDITOR"]), (request: any, response, next) => {
    // try {
    //     const notesList = await noteService.getAll()
    //     response.json(notesList);    
    // } catch (error) {
    //     next(error);
    // }

    console.log("USER :: ", request.user);

    noteService
        .getAll()
        .then(notesList => response.json(notesList))
        .catch(next)


});

router.post("/", authorization(), async (request, response, next) => {
    try {
        console.log(request.body);

        const body = request.body;
        await noteService.save(body.title,body.content)
        response.json(body);
    } catch (error: any) {
        console.log(error.message);
        next(error);
    }

});




// router.get("/:title", (request, response) => {
//     response.json(noteService.getByTitle(request.params.title))
// });

// router.put("/:title", (request, response) => {
//     console.log(request.body);

//     const body = request.body;
//     noteService.save(body.title, body.content);

//     response.json({message: "Notes saved successfully.!"});
// });

// router.delete("/:title", (request, response) => {
//     noteService.deleteByTitle(request.params.title)
//     response.json({message: "Notes saved successfully.!"});
// });
