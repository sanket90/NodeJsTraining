const socket = io();

const notesEle = document.getElementById("notes");

socket.on("notes:list:all", (noteList) => {
    console.log(noteList);
    const notesDisplay = noteList.map(item => {
        return `<li class"list-group-item">
            <a href="/public/notes/${item.heading}">${item.heading}</a>
            </li>`
    })
    .reduce((prev, curr) => {
        return prev + curr
    }, "")
    notesEle.innerHTML = notesDisplay;
})


setInterval(() => {
    // save note
    // socket.emit("notes:save", title.value, content.value);

}, 10000); // 10s