const socket = io();

const title = document.getElementById("title");
const content = document.getElementById("content");

const success = document.getElementById("success");
const failure = document.getElementById("failure");

console.log();

socket.on("notes:save:success", (msg) => {
    success.innerHTML = msg;
})
socket.on("notes:save:failure", (msg) => {
    failure.innerHTML = msg;
})

setInterval(() => {
    // save note
    // socket.emit("notes:save", title.value, content.value);

}, 10000); // 10s