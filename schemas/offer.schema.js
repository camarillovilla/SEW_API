const Joi = require('joi');

const recruiterId = Joi.number().integer().positive();
const category = Joi.string().max(255);
const id = Joi.number().integer();
const title = Joi.string().max(255);
const workday = Joi.string().max(255);
const description = Joi.string().max(255);
const experience = Joi.string().max(255);
const status = Joi.string().max(255);
const score = Joi.number().integer();
const reportsNumber = Joi.number().integer();
const changes = Joi.object({
  title: title,
  workday: workday,
  description: description,
  experience: experience,
  category: category,
  status: status,
  score: score,
  reportsNumber: reportsNumber
});

const getOfferSchema = Joi.object({
  recruiterId: recruiterId.required()
});

const getOffersByCategorySchema = Joi.object({
  category: category.required()
});

const getOneOfferSchema = Joi.object({
  id: id.required()  
});

const updateOfferSchema = Joi.object({
  id: id.required(),
  changes: changes.required()
});

module.exports = {getOfferSchema, getOffersByCategorySchema, getOneOfferSchema, updateOfferSchema};

