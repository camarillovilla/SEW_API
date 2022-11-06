const Joi = require('joi');

const id = Joi.number().integer().positive();
const skill = Joi.string();

const createCVSkill = Joi.object({
  cvId: id.required(),
  skill: skill.required()
});

const updateCVSkill = Joi.object({
  skill
});

const getCVSkill = Joi.object({
  id: id.required()
});

module.exports = { createCVSkill, updateCVSkill, getCVSkill };

