const socket = io();

const title = document.getElementById("title");
const content = document.getElementById("content");
let lastSavedTitle, lastSavedContent;

const success = document.getElementById("success");
const failure = document.getElementById("failure");
const validation = document.getElementById("validation");
const info = document.getElementById("info");

console.log(titlePathParam);
let isNew = true;


const hideEle = (elementId) => {
    elementId.style.display = "none";
}

const showEle = (elementId) => {
    elementId.style.display = "block";
}

const autoHideMessage = (elementId, msg, timeInMs = 5000) => {
    if (!!msg)
        elementId.innerHTML = msg;
    
    showEle(elementId)
    setTimeout(() => {
        hideEle(elementId)
    }, timeInMs)
}
const isValid = (title, content) => {
    return (!!title && !!content)
}
const checkIfTitleUpdated = (prevTitle, currTitle) => {
    return prevTitle !== currTitle
}
const checkIfContentUpdated = (prevContent, currContent) => {
    return prevContent !== currContent
}

hideEle(success);
hideEle(failure);
hideEle(validation);
hideEle(info);
autoHideMessage(info);

socket.on("notes:save:success", (msg) => {
    autoHideMessage(success, msg)
})
socket.on("notes:save:failure", (msg) => {
    autoHideMessage(failure, msg)
})
const getNote = () => {
    if (titlePathParam !== "NEW_NOTE") {
        isNew = false;
        socket.emit("notes:get:title", titlePathParam)
        socket.on("notes:get:title:success", (noteTitle, noteContent) => {
            title.value = noteTitle;
            content.value = noteContent;
            lastSavedTitle = noteTitle;
            lastSavedContent = noteContent;
        })
    }
}
getNote();





setInterval(() => {
    // save note
    const currTitle = title.value;
    const currContent = content.value;
    
    if (!isValid(currTitle, currContent)) {
        autoHideMessage(validation, "Both title and Content are required.!")
        return;
    }
    
    if (checkIfTitleUpdated(lastSavedTitle, currTitle) 
        || checkIfContentUpdated(lastSavedContent, currContent)) {
        lastSavedTitle = currTitle;
        lastSavedContent = currContent;
        socket.emit("notes:save", currTitle, currContent, isNew);
        isNew = false;
    }

    
}, 10000); // 10s