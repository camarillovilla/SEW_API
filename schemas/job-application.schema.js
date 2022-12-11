const Joi = require('joi');

const employeeId = Joi.number().integer();
const offerId = Joi.number().integer();
const status = Joi.string().max(255);

const getOneJobApplicationSchema = Joi.object({
  employeeId: employeeId.required(),
  offerId: offerId.required()  
});

const getOfferJobApplicationsSchema = Joi.object({  
  offerId: offerId.required()  
});

const getEmployeeJobApplicationsSchema = Joi.object({  
  employeeId: employeeId.required()  
});

const createJobApplicationSchema = Joi.object({  
  status: status.required(),
  employeeId: employeeId.required(),
  offerId: offerId.required()  
});

module.exports = {getOneJobApplicationSchema, getOfferJobApplicationsSchema, getEmployeeJobApplicationsSchema, createJobApplicationSchema};

