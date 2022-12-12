const Joi = require('joi');

const id = Joi.number().integer().positive();
const certification = Joi.string().max(250);

const createCVCertification = Joi.object({
  cvId: id.required(),
  certification: certification.required()
});

const updateCVCertification = Joi.object({
  certification
});

const getCVCertification = Joi.object({
  id: id.required()
});

module.exports = { createCVCertification, updateCVCertification, getCVCertification };

