import express from "express";
import mediaController from "../controller/media-controller.js";

const mediaHandler = new express.Router();

mediaHandler.post("/media", mediaController.create);

export {
    mediaHandler
}