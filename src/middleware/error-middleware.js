import {ResponseError} from "../exception/response-error.js";
import joi from "joi";
const {ValidationError} = joi;

const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }

    if (err instanceof ResponseError) {
        res.status(err.statusCode).json({
            code: err.statusCode,
            status: err.statusText,
            errors: {
                message: err.message
            }
        }).end();
    }

    else if (err instanceof ValidationError) {
        const errors = [];
        err.details.map((v) => {
            const split = v.message.split(`"`);
            errors.push(
                {
                    message: `${split[1]}${split[2]}`,
                    type: v.type
                });
        });
        res.status(400).json({
            code: 400,
            status: "Bad Request",
            errors: {
                message: errors
            }
        }).end();
    }

    else {
        res.status(500).json({
            code: err.statusCode,
            status: err.statusText,
            errors: {
                message: err.message
            }
        }).end();
    }
}

export {
    errorMiddleware
}