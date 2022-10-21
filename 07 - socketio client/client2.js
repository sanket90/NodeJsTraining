import { io } from 'socket.io-client';


const socket = io("ws://localhost:4400");

socket.emit("clientInit", "CLIENT2");


socket.on("message", (fromId, toId, msg) => {
    console.log(fromId, " :: ", msg);
})

socket.on("broadcast", (fromId, msg) => {
    console.log(fromId, " :: ", msg);
})

setTimeout(() => {
    socket.emit(
        "message",
        "CLIENT2",
        "CLIENT1",
        "Hello from CLIENT2"
        );
}, 5000)