const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const BadRequestError = require('../errors/bad-request-error');

const validationUrl = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new BadRequestError('Невалидный URL');
  }
  return value;
};

function validationLink(v) {
  return /^(https?:\/\/)?(www.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?$/.test(v);
}

const validationPostMovies = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validationUrl),
    trailerLink: Joi.string().required().custom(validationUrl),
    nameRu: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom(validationUrl),
    movieId: Joi.string().required(),
  }),
});

const validationSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().required(),
    email: Joi.string().required().email(),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationUserUpdate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validationDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  validationUserUpdate,
  validationLogin,
  validationSignUp,
  validationLink,
  validationUrl,
  validationPostMovies,
  validationDeleteMovie,
};
