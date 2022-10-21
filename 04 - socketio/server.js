import { Server } from 'socket.io';

const io = new Server(4400);


const connectedUsers = new Map();

io.on("connection", (socket) => {



    socket.on("clientInit", (clientId) => {
        connectedUsers.set(clientId, socket.id)

        console.log(clientId, socket.id);
        // socket.join(roomId)
    })

    socket.on("message", (fromId, toId, msg) => {
        if (connectedUsers.has(toId)) {
            socket
                .to(connectedUsers.get(toId))
                .emit("message", fromId, toId, msg)
        }
    })

    socket.on("broadcast", (fromId, msg) => {
        // connectedUsers.forEach((socketId, clientId) => {
            
        //     if (fromId != clientId) {
        //         socket
        //         .to(socketId)
        //         .emit("broadcast", fromId, msg)
        //     }
            
        // })
        
        socket.broadcast.emit("broadcast", fromId, msg)
        
    })

})
