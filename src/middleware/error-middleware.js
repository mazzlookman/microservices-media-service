import {ResponseError} from "../exception/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }

    if (err instanceof ResponseError) {
        res.status(err.statusCode).json({
            code: err.statusCode,
            status: err.statusText,
            errors: err.message
        }).end();
    }  else {
        console.log(err)
        res.status(500).json({
            code: err.statusCode,
            status: err.statusText,
            errors: err.message
        }).end();
    }
}

export {
    errorMiddleware
}