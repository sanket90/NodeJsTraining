import { io } from 'socket.io-client';


const socket = io("ws://localhost:4400");

socket.emit("clientInit", "CLIENT1");


socket.on("message", (fromId, toId, msg) => {
    console.log(fromId, " :: ", msg);
})



setTimeout(() => {
    socket.emit(
        "message",
        "CLIENT1",
        "CLIENT2",
        "Hola from CLIENT1"
        );
}, 5000)

socket.on("broadcast", (fromId, msg) => {
    console.log(fromId, " :: ", msg);
})
socket.disconnect()
setTimeout(() => {
    socket.emit(
        "broadcast",
        "CLIENT1",
        "Hello to All.!"
        );
}, 7000)