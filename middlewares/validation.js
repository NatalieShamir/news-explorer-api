const { Joi, celebrate } = require('celebrate');
const { ObjectId } = require('mongoose').Types;

const validator = require('validator');

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
};

// Article Validation
const validateArticleBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required()
      .messages({
        'string.empty': 'The "name" field must be filled-in',
      }),
    title: Joi.string().required()
      .messages({
        'string.empty': 'The "title" field must be filled-in',
      }),
    text: Joi.string().required()
      .messages({
        'string.empty': 'The "text" field must be filled-in',
      }),
    date: Joi.string().required()
      .messages({
        'string.empty': 'The "date" field must be filled-in',
      }),
    source: Joi.string().required()
      .messages({
        'string.empty': 'The "source" field must be filled-in',
      }),
    link: Joi.string().required().custom(validateUrl)
      .message('The "link" field must be a valid URL')
      .messages({
        'string empty': 'The "link" field must be filled-in',
      }),
    image: Joi.string().required().custom(validateUrl)
      .message('The "image" field must be a valid URL')
      .messages({
        'string empty': 'The "image" field must be filled-in',
      }),
  }),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Invalid article ID');
    }),
  }),
});

// User Validation
const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('The "email" field must be a valid email')
      .messages({
        'string.empty': 'The "email" field must be filled-in',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'The "password" field must be filled-in',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'The minimum length of the "name" field is 2',
        'string.max': 'The maximum length of the "name" field is 30',
      }),
  }),
});

// Login Validation
const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('The "email" field must be a valid email')
      .messages({
        'string.required': 'The "email" field must be filled-in',
      }),
    password: Joi.string().required()
      .messages({
        'string.empty': 'The "password" field must be filled-in',
      }),
  }),
});

module.exports = {
  validateArticleBody,
  validateArticleId,
  validateUserBody,
  validateAuthentication,
};
