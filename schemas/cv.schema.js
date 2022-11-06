const Joi = require('joi');

const id = Joi.number().integer().positive();
const description = Joi.string();
const employeeId = Joi.number().integer();
const lenguage = Joi.object().keys({
  lenguage: Joi.string().required()
});
const workExperience = Joi.object().keys({
  workExperience: Joi.string().required()
});
const academicTraining = Joi.object().keys({
  academicTraining: Joi.string().required()
});
const certification = Joi.object().keys({
  certification: Joi.string().required()
});
const skill = Joi.object().keys({
  skill: Joi.string().required()
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

