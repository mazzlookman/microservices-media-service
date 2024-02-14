import mediaService from "../service/media-service.js";
const create = async (req, res, next) => {
    try {
        const media = await mediaService.create(req.body);
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

const remove = async (req, res, next) => {
    try {
        await mediaService.remove(parseInt(req.params.id));
        return res.json({
            code: 200,
            status: "OK",
            data: {
                is_deleted: true
            }
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    getAll,
    remove
}