import Joi from 'joi';

export const joiCategory = Joi.object({
  name: Joi.string().max(30).required(),
});
