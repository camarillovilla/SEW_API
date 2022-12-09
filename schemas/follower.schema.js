const Joi = require('joi');

const recruiterId = Joi.number().integer().positive();

const getFollowersByRecluiterSchema = Joi.object({
  recruiterId: recruiterId.required()
});

module.exports = {getFollowersByRecluiterSchema};

