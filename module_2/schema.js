import Joi from 'joi';

export const schema = Joi.object({
    login: Joi.string().required(),
    password: Joi.string().pattern(/^[a-z0-9]+$/i, { name: 'alphanumerical'}).required(),
    age: Joi.number().min(4).max(130).required()
});
