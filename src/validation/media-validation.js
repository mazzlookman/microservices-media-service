import Joi from "joi";

const createImageValidation = Joi.object({
    image: Joi.string().required(),
});

export {
    createImageValidation
}