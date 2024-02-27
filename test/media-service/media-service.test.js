import supertest from "supertest";
import {web} from "../../src/app/web.js";
import fs from "node:fs";
import mediaService from "../../src/service/media-service.js";

const readFileSync = fs.readFileSync("D:\\CodingTraining\\Development\\NodeJS\\microservices-me\\media-service\\test\\media-service\\base64-image.txt","utf-8");

const createMedia = async () => {
    return mediaService.create({image:readFileSync});
}
describe("Media service test", () => {
    it("should can upload image", async () => {
        const res = await supertest(web)
            .post("/media")
            .send({
                image: readFileSync,
            });

        expect(res.status).toBe(200);
        expect(res.body.data.id).toBeDefined();
    });

    it("should can't upload image (400)", async () => {
        const res = await supertest(web)
            .post("/media")
            .send({
                image: `${readFileSync}123`,
            });
        expect(res.status).toBe(400);
    });

    it("should get all images", async () => {
        const res = await supertest(web)
            .get("/media");

        expect(res.status).toBe(200);
        expect(res.body.status).toBe("OK");
    });

    it('should can delete image', async () => {
        const media = await createMedia();
        const res = await supertest(web)
            .delete(`/media/${media.id}`);

        expect(res.status).toBe(200);
    });

    it("should can't delete image (404)", async () => {
        const media = await createMedia();
        const res = await supertest(web)
            .delete(`/media/${media.id+1}`);

        expect(res.status).toBe(404);
    });
});