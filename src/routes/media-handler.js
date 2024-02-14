import express from "express";
import mediaController from "../controller/media-controller.js";

const mediaHandler = new express.Router();

mediaHandler.post("/media", mediaController.create);
mediaHandler.get("/media", mediaController.getAll);
mediaHandler.delete("/media/:id", mediaController.remove);

export {
    mediaHandler
}