import supertest from "supertest";
import {web} from "../../src/app/web.js";
import fs from "node:fs";

describe("Media service tests", () => {
    it("should can upload image", async () => {
        const readFileSync = fs.readFileSync("D:\\CodingTraining\\Development\\NodeJS\\microservices-me\\media-service\\tests\\media-service\\base64-image.txt","utf-8");
        const res = await supertest(web)
            .post("/media")
            .send({
                image: readFileSync,
            });
        expect(res.status).toBe(200);
        expect(res.body.data.id).toBeDefined();
    });
});