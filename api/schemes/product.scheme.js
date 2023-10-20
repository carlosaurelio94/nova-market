const Joi = require('joi');

const id = Joi.number().integer().min(1);
const name = Joi.string().min(1).max(15);
const quantity = Joi.number().integer();
const price = Joi.number().integer().min(10);

const createProductScheme = Joi.object({
  name: name.required(),
  quantity: quantity.required(),
  price: price.required(),
});

const updateProductScheme = Joi.object({
  name: name,
  quantity: quantity,
  price: price,
});

const getProductScheme = Joi.object({
  id: id.required(),
});

module.exports = { createProductScheme, updateProductScheme, getProductScheme }
