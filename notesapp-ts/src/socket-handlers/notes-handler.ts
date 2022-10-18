import { Server, Socket } from 'socket.io';
import { NotesService } from '../services/notes-service.js';

export class NotesHandler {

    io;
    socket;
    noteService = new NotesService();

    constructor(io: Server, socket: Socket) {
        this.io = io;
        this.socket = socket;
        socket.on("notes:save", this.save)
        this.list();
        socket.on("notes:get:title", this.getByTitle)
    }

    list = async () => {
        const notelist = await this.noteService.getAll();
        this.socket.emit("notes:list:all", notelist)
    }

    getByTitle = async (title: string) => {
        const note = await this.noteService.getByTitle(title);
        this.socket.emit("notes:get:title:success", note.title, note.content)
    }

    save = async (title: string, content: string, isNew=true) => {
        try {
            
            await this.noteService.save(title, content, isNew)
            this.socket.emit("notes:save:success", "Notes saved successfully")
        } catch (error: any) {
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