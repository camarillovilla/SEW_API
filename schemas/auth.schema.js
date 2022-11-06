const Joi = require('joi');

const email = Joi.string().email();
const password = Joi.string().min(8);
const token = Joi.string();

const loginSchema = Joi.object({
  email: email.required(),
  password: password.required()
});

const recoverySchema = Joi.object({
  email: email.required()
});

const changePasswordSchema = Joi.object({
  token: token.required(),
  newPassword: password.required()
});

module.exports = { loginSchema, recoverySchema, changePasswordSchema };
