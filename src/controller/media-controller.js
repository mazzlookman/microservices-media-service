import mediaService from "../service/media-service.js";
const create = async (req, res, next) => {
    try {
        const media = await mediaService.create(req.body.image);
        return res.json({
            code: 200,
            status: "OK",
            data: {
                id: media.id,
                image: `${req.get("host")}/${media.image}`
            }
        });

    } catch (err) {
        next(err);
    }
}

const getAll = async (req, res, next) => {
    try{
        const allMedia = await mediaService.getAll();
        return res.json({
            code: 200,
            status: "OK",
            data: allMedia
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    getAll
}