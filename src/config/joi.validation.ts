import * as Joi from "joi";

export const JoiVlidationSchema = Joi.object({
    MONGODB: Joi.required(),
    POST: Joi.number().default(3005),
    DEFAULT_LIMIT: Joi.number().default(10),
});