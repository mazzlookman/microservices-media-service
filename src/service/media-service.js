import isBase64 from "is-base64";
import base64Img from "base64-img";
import {prismaClient} from "../app/database.js";
import {ResponseError} from "../exception/response-error.js";

const create = async (image) => {
    if (!isBase64(image, {mimeRequired: true})){
        throw new ResponseError(400, "Bad Request", "Invalid base64 of image")
    }

    const filePath = base64Img.imgSync(image, "./public/images", Date.now());

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

export default {
    create,
}