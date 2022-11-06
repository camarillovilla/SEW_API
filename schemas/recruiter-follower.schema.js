const Joi = require('joi');

const id = Joi.number().integer();
const recruiterId = Joi.number().integer();
const userRfc = Joi.string();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createRecruiterFollowerSchema = Joi.object({
  recruiterId: recruiterId.required(),
  userRfc: userRfc.required()
});

const getRecruiterFollowerSchema = Joi.object({
  id: id.required()
});

const queryRecruiterFollowerSchema = Joi.object({
  limit: limit,
  offset: offset
});

module.exports = { createRecruiterFollowerSchema, getRecruiterFollowerSchema, queryRecruiterFollowerSchema };
