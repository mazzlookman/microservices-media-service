import {ResponseError} from "../exception/response-error.js";

export const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
    });

    if (result.error) {
        throw new ResponseError(400, "Bad Request", result.error.message);
    } else {
        return result.value;
    }
}