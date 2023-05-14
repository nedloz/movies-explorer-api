const { celebrate, Joi } = require('celebrate');

const { linkSchema, ruSchema, enSchema } = require('../utils/constants');

const signUpValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required().max(30).min(2),
  }),
});

const signInValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const updateMeValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(2).max(30),
  }),
});

const createFilmValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkSchema),
    trailerLink: Joi.string().required().pattern(linkSchema),
    thumbnail: Joi.string().required().pattern(linkSchema),
    owner: Joi.string().required().alphanum().length(24),
    movieId: Joi.string().required(),
    nameRu: Joi.string().required().pattern(ruSchema),
    nameEn: Joi.string().required().pattern(enSchema),
  }),
});

const deleteFilmValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24),
  }),
});

module.exports = {
  signUpValidator,
  signInValidator,
  updateMeValidator,
  createFilmValidator,
  deleteFilmValidator,
};
