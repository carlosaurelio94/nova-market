const Joi = require('joi');

const id = Joi.number().integer().min(1);
const name = Joi.string().min(1).max(15);
const location = Joi.string().min(3).max(25);
const image = Joi.string().uri()

const createStoreScheme = Joi.object({
  name: name.required(),
  location: location.required(),
  image: image.required()
});

const updateStoreScheme = Joi.object({
  name: name,
  location: location,
  image: image
});

const getStoreScheme = Joi.object({
  id: id.required(),
});

module.exports = { createStoreScheme, updateStoreScheme, getStoreScheme }
