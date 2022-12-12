const Joi = require('joi');

const id = Joi.number().integer().positive();
const description = Joi.string().max(250);
const employeeId = Joi.number().integer();
const lenguage = Joi.object().keys({
  lenguage: Joi.string().required().max(100),
});
const workExperience = Joi.object().keys({
  workExperience: Joi.string().required().max(250),
});
const academicTraining = Joi.object().keys({
  academicTraining: Joi.string().required().max(250),
});
const certification = Joi.object().keys({
  certification: Joi.string().required().max(250),
});
const skill = Joi.object().keys({
  skill: Joi.string().required().max(250),
});

const createCVSchema = Joi.object({
  description: description.required(),
  employeeId: employeeId.required(),
  lenguages: Joi.array().items(lenguage).unique().required(),
  workExperiences: Joi.array().items(workExperience).required(),
  academicTrainings: Joi.array().items(academicTraining).required(),
  certifications: Joi.array().items(certification).required(),
  skills: Joi.array().items(skill).required(),
});

const updateCVSchema = Joi.object({
  description
});

const getCVSchema = Joi.object({
  id: id.required()
});

module.exports = { createCVSchema, updateCVSchema, getCVSchema };

