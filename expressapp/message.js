export class MessageResponse {
    status;
    message;

    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}



export const convertToString = (num) => {
    return `${num}`;
}