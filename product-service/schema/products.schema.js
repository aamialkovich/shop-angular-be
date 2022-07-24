const Joi = require('joi');

export const productsSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  count: Joi.number().positive().required(),
});
