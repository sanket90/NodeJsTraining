import { io } from 'socket.io-client';


const socket = io("ws://localhost:4400");

socket.emit("clientInit", "OTHER");


socket.on("message", (fromId, toId, msg) => {
    console.log(fromId, " :: ", msg);
})

socket.on("broadcast", (fromId, msg) => {
    console.log(fromId, " :: ", msg);
})