const Joi = require('joi');

const id = Joi.number().integer();
const employeeId = Joi.number().integer();
const offerId = Joi.number().integer();
const status = Joi.string().max(255);
const changes = Joi.object({
  status: status,
  employeeId: employeeId,
  offerId: offerId  
});

const getOneJobApplication = Joi.object({
  id: id.required()  
});

const getOneJobApplicationEmployeeSchema = Joi.object({
  employeeId: employeeId.required(),
  offerId: offerId.required()  
});

const getOfferJobApplicationsSchema = Joi.object({  
  offerId: offerId.required()  
});

const getOfferStatusJobApplicationsSchema = Joi.object({  
  offerId: offerId.required(),
  status: status.required()  
});

const getEmployeeJobApplicationsSchema = Joi.object({  
  employeeId: employeeId.required()  
});

const createJobApplicationSchema = Joi.object({  
  status: status.required(),
  employeeId: employeeId.required(),
  offerId: offerId.required()  
});

const updateJobApplicationSchema = Joi.object({  
  id: id.required(),
  changes: changes.required()
});

module.exports = { getOneJobApplication, getOneJobApplicationEmployeeSchema, getOfferJobApplicationsSchema, getOfferStatusJobApplicationsSchema, getEmployeeJobApplicationsSchema, createJobApplicationSchema, updateJobApplicationSchema};

