import isBase64 from "is-base64";
import base64Img from "base64-img";
import {prismaClient} from "../app/database.js";
import {ResponseError} from "../exception/response-error.js";
import { v4 as uuidv4 } from 'uuid';
import {validate} from "../validation/validation.js";
import {createImageValidation} from "../validation/media-validation.js";
import fs from "node:fs";

const create = async (imageRequest) => {
    const image = validate(createImageValidation, imageRequest).image;

    if (!isBase64(image, {mimeRequired: true})){
        throw new ResponseError(400, "Bad Request", "Invalid base64 of image")
    }

    const filePath = base64Img.imgSync(image, "./public/images", uuidv4());

    // if you run this code on Windows, change filename value to this:
    // const fileName = filePath.split("\\").pop()
    const fileName = filePath.split("/").pop()

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

const remove = async (mediaId) => {
    const media = await prismaClient.media.findUnique({
        where: {
            id: mediaId,
        }
    });

    if (media === null) {
        throw new ResponseError(404, "Not Found", "Image not found");
    }

    fs.unlink(`./public/${media.image}`, (err) => {
        if (err) {
            throw new ResponseError(500, "Internal Server Error", "Image not deleted on server storage");
        }
    });

    return prismaClient.media.delete({
        where: {
            id: mediaId,
        }
    });
}

export default {
    create,
    getAll,
    remove
}