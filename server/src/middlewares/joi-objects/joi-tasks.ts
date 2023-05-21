import Joi from 'joi';

export const joiTaskPost = Joi.object({
  title: Joi.string().min(1).max(30).message('O título deve ter entre 1 e 30 caracteres').required(),
  description: Joi.string().max(300).message('A descrição deve ter até 300 caracteres').allow('', null),
  category: Joi.string().min(1).max(30).message('Categoria inválida').required(),
});

export const joiTaskPatch = Joi.object({
  id: Joi.string().uuid().message('ID inválido').required(),
  title: Joi.when('concluded', {
    is: true,
    then: Joi.string().allow('', null),
    otherwise: Joi.string().min(1).max(30).message('O título deve ter entre 1 e 30 caracteres').required(),
  }),
  description: Joi.string().max(300).message('A descrição deve ter até 300 caracteres').allow('', null),
  category: Joi.string().min(1).max(30).message('Categoria inválida').required(),
  concluded: Joi.allow(Joi.boolean(), '', null),
});

export const joiTaskDelete = Joi.object({
  id: Joi.string().uuid().message('ID inválido').required(),
  category: Joi.string().min(1).max(30).message('Categoria inválida').required(),
});
