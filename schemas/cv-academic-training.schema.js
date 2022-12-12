const Joi = require('joi');

const id = Joi.number().integer().positive();
const academicTraining = Joi.string().max(250);

const createCVAcademicTraining = Joi.object({
  cvId: id.required(),
  academicTraining: academicTraining.required()
});

const updateCVAcademicTraining = Joi.object({
  academicTraining
});

const getCVAcademicTraining = Joi.object({
  id: id.required()
});

module.exports = { createCVAcademicTraining, updateCVAcademicTraining, getCVAcademicTraining };

