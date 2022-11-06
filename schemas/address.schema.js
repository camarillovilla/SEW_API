const Joi = require('joi');

const id = Joi.number().integer();
const city = Joi.string();
const insideNumber = Joi.number().integer().positive();
const outSideNumber = Joi.number().integer().positive();
const postalCode = Joi.number().integer().max(5).positive();
const streetName = Joi.string();
const userRfc = Joi.string();

const createAddressSchema = Joi.object({
  city: city.required(),
  insideNumber: insideNumber.required(),
  outSideNumber: outSideNumber.required(),
  postalCode: postalCode.required(),
  streetName: streetName.required(),
  userId: userRfc.required()
});

const updateAddressSchema = Joi.object({
  city: city,
  insideNumber: insideNumber,
  outSideNumber: outSideNumber,
  postalCode: postalCode,
  streetName: streetName
});

const getAddressSchema = Joi.object({
  id: id.required()
});

module.exports = { createAddressSchema, updateAddressSchema, getAddressSchema};
