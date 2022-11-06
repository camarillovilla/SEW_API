const Joi = require('joi');

const id = Joi.number().integer().positive();
const lenguage = Joi.string();

const createCVLenguage = Joi.object({
  cvId: id.required(),
  lenguage: lenguage.required()
});

const updateCVLenguage = Joi.object({
  lenguage
});

const getCVLenguage = Joi.object({
  id: id.required()
});

module.exports = { createCVLenguage, updateCVLenguage, getCVLenguage };

