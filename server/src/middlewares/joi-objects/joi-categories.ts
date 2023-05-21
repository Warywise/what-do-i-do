import Joi from 'joi';

export const joiCategory = Joi.object({
  name: Joi.string().max(30).message('O nome deve ter até 30 caracteres').required(),
});
