import express from "express";
import logger from "morgan";
import { mediaHandler } from "../routes/media-handler.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express();

web.use(logger(process.env.LOG_FORMAT));
web.use(express.json());
web.use(express.static("public"));

web.use("/api", mediaHandler);

web.use(errorMiddleware);
