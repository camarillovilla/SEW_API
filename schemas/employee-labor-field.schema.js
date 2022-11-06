const Joi = require('joi');

const id = Joi.number().integer();
const laborField = Joi.string();
const recruiterId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createEmployeeLaborFieldSchema = Joi.object({
  laborField: laborField.required(),
  recruiterId: recruiterId.required()
});

const updateEmployeeLaborFieldSchema = Joi.object({
  laborField: laborField
});

const getEmployeeLaborFieldSchema = Joi.object({
  id: id.required()
});

const queryEmployeeLaborFieldSchema = Joi.object({
  limit: limit,
  offset: offset
});

module.exports = { createEmployeeLaborFieldSchema, updateEmployeeLaborFieldSchema, getEmployeeLaborFieldSchema, queryEmployeeLaborFieldSchema };
