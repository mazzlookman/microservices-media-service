export class ResponseError extends Error {
    constructor(statusCode, statusText, message) {
        super(message);
        this.statusCode = statusCode
        this.statusText = statusText
    }
}