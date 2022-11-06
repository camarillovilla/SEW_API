const Joi = require('joi');

const id = Joi.number().integer();
const interest = Joi.string();
const employeeId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createEmployeeInterestSchema = Joi.object({
  interest: interest.required(),
  employeeId: employeeId.required()
});

const updateEmployeeInterestSchema = Joi.object({
  interest: interest
});

const getEmployeeInterestSchema = Joi.object({
  id: id.required()
});

const queryEmployeeInterestSchema = Joi.object({
  limit: limit,
  offset: offset
});

module.exports = { createEmployeeInterestSchema, updateEmployeeInterestSchema, getEmployeeInterestSchema, queryEmployeeInterestSchema };
