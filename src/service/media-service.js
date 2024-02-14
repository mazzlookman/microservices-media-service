import isBase64 from "is-base64";
import base64Img from "base64-img";
import {prismaClient} from "../app/database.js";
import {ResponseError} from "../exception/response-error.js";
import { v4 as uuidv4 } from 'uuid';
import {validate} from "../validation/validation.js";
import {createImageValidation} from "../validation/media-validation.js";

const create = async (imageRequest) => {
    const image = validate(createImageValidation, imageRequest);

    if (!isBase64(image, {mimeRequired: true})){
        throw new ResponseError(400, "Bad Request", "Invalid base64 of image")
    }

    const filePath = base64Img.imgSync(image, "./public/images", uuidv4());

    // public\\images\\1707554415923.png
    const fileName = filePath.split("\\").pop()

    return prismaClient.media.create({
        data: {
            image: `images/${fileName}`
        },
        select: {
            id: true,
            image: true
        }
    });
}

const getAll = async () => {
    return prismaClient.media.findMany({
        select: {
            id: true,
            image: true
        }
    });
}

export default {
    create,
    getAll
}