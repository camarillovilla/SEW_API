const Joi = require('joi');

const rfcPatern = '^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z]|[0-9]){2}([A]|[0-9]){1})?$';
const passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[\\da-zA-ZÀ-ÿ\\u00f1\\u00d1$@$!%*?&#-.$($)$-$_]{8,16}$'

const id = Joi.number().integer().positive();
const email = Joi.string().email();
const fullName = Joi.string().min(5).max(50);
const password = Joi.string().regex(RegExp(passwordPattern));
const phone = Joi.number().integer().positive().max(9999999999);
const rfc = Joi.string().regex(RegExp(rfcPatern));
const role = Joi.string().valid('Employee');
const provider = Joi.string().valid('Local');

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createEmployeeSchema = Joi.object({
  fullName: fullName.required(),
  phone: phone.required(),
  user: Joi.object({
    rfc: rfc.required(),
    role: role.required(),
    email: email.required(),
    password: password.required(),
    provider: provider.required(),
  })
});

const updateEmployeeSchema = Joi.object({
  fullName: fullName,
  phone: phone,
  rfc: rfc,
  email: email,
});

const getEmployeeSchema = Joi.object({
  id: id.required()
});

const queryEmployeeSchema = Joi.object({
  limit: limit,
  offset: offset
});

module.exports = { createEmployeeSchema, updateEmployeeSchema, getEmployeeSchema, queryEmployeeSchema };
