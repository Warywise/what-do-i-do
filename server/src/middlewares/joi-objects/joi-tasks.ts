import Joi from 'joi';

export const joiTaskPost = Joi.object({
  title: Joi.string().min(1).max(50).required(),
  description: Joi.string().max(300).allow('', null),
  category: Joi.string().min(1).max(30).message('Invalid board name').required(),
});

export const joiTaskPatch = Joi.object({
  id: Joi.string().uuid().message('Invalid ID').required(),
  title: Joi.when('concluded', {
    is: Joi.boolean(),
    then: Joi.string().allow('', null),
    otherwise: Joi.string().min(1).max(50).required(),
  }),
  description: Joi.string().max(300).allow('', null),
  category: Joi.string().min(1).max(30).message('Invalid board name').required(),
  concluded: Joi.allow(Joi.boolean(), '', null),
});

export const joiTaskDelete = Joi.object({
  id: Joi.string().uuid().message('Invalid ID').required(),
  category: Joi.string().min(1).max(30).message('Invalid board name').required(),
});
