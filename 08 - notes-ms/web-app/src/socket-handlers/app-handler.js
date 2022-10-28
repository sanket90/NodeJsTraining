import { NotesHandler } from "./notes-handler.js"

export const appHandler = (io) => {

    return (socket) => {


        new NotesHandler(io, socket);
        // new UsersHandler(io, socket);
        // new LogHandler(io, socket);
    }

}