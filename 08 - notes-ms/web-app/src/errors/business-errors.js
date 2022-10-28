export class BusinessError extends Error {
    statusCode;
    constructor(message = "Service Exception Occurred.!", statusCode = 500, ) {
        super();
        this.name = "BusinessError"
        this.message = message;

        this.statusCode = statusCode;
    }
}



export class EmptyRecords extends BusinessError {
    constructor(message = "Entity fetched 0 records.!") {
        super(message, 404);
    }
}