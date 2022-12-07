const Joi = require('joi');

const recruiterId = Joi.number().integer().positive();

const getOfferSchema = Joi.object({
  recruiterId: recruiterId.required()
});

module.exports = {getOfferSchema};

