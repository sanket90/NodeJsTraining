import { Socket, Server } from "socket.io";
import { NotesHandler } from "./notes-handler"

export const appHandler = (io: Server) => {

    return (socket: Socket) => {

        new NotesHandler(io, socket);
        // new UsersHandler(io, socket);
        // new LogHandler(io, socket);
    }

}