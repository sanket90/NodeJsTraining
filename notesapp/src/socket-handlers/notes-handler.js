import { NotesService } from '../services/notes-service.js';

export class NotesHandler {

    io;
    socket;
    noteService = new NotesService();

    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
        socket.on("notes:save", this.save)
    }

    save = async (title, content) => {
        try {
            
            await this.noteService.save(title, content)
            this.socket.emit("notes:save:success", "Notes saved successfully")
        } catch (error) {
            console.log(error.message);
                // next(error);
                this.socket.emit("notes:save:failure", error.message)
        }

        // this.noteService
        //     .save(title, content)
        //     .then(() => {
        //         this.socket.emit("notes:save:success", "Notes saved successfully")
        //     })
        //     .catch((err) => {
        //         console.log(error.message);
        //         // next(error);
        //         this.socket.emit("notes:save:failure", error.message)
        //     });
    }

}