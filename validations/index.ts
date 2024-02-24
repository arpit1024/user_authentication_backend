import Joi from "joi";

// Define validation schema for user details
export const userSchemaValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().length(10)
});
