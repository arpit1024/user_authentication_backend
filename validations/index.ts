import Joi from "joi";

// Define validation schema for user details
export const userSchemaValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().length(10),
});

export const userProfileValidator = Joi.object({
  name: Joi.string(),
  email: Joi.string().email().required(),
  jobRole: Joi.string(),
  phone: Joi.string().length(10),
  preferToLiveIn: Joi.string(),
  working: Joi.string().allow('fresher', 'professional'),
  companyLocation: Joi.string(),
  requiredAmountToRelocate: Joi.number(),
  reasonToRelocate: Joi.string()
});
