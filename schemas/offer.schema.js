const Joi = require('joi');

const recruiterId = Joi.number().integer().positive();
const category = Joi.string().min(1).max(255);

const getOfferSchema = Joi.object({
  recruiterId: recruiterId.required()
});

const getOffersByCategorySchema = Joi.object({
  category: category.required()
});

module.exports = {getOfferSchema, getOffersByCategorySchema};

