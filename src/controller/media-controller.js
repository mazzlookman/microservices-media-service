import mediaService from "../service/media-service.js";

const {HOSTNAME_URL} = process.env

const create = async (req, res, next) => {
    try {
        const media = await mediaService.create(req.body);
        return res.json({
            code: 200,
            status: "OK",
            data: {
                id: media.id,
                image: `${HOSTNAME_URL}/${media.image}`
            }
        });

    } catch (err) {
        next(err);
    }
}

const getAll = async (req, res, next) => {
    try{
        const allMedia = await mediaService.getAll();

        const mappedMedia = allMedia.map((m) => {
            m.image = `${HOSTNAME_URL}/${m.image}`
            return m
        })

        return res.json({
            code: 200,
            status: "OK",
            data: mappedMedia
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