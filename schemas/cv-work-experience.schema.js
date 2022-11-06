const Joi = require('joi');

const id = Joi.number().integer().positive();
const workExperience = Joi.string();

const createCVWorkExperience = Joi.object({
  cvId: id.required(),
  workExperience: workExperience.required()
});

const updatedCVWorkExperience = Joi.object({
  workExperience
});

const getCVWorkExperience = Joi.object({
  id: id.required()
});

module.exports = { createCVWorkExperience, updatedCVWorkExperience, getCVWorkExperience };

