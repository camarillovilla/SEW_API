const express = require('express');
const JobApplicationService = require('../services/job-application.service');
const validatorHandler = require('../middlewares/validator.handler');
// const { checkRoles } = require('../middlewares/auth.handler');
const { getOneJobApplicationEmployeeSchema, getOfferJobApplicationsSchema, getEmployeeJobApplicationsSchema, createJobApplicationSchema } = require('../schemas/job-application.schema');
const router = express.Router();
const service = new JobApplicationService();


router.post('/oneJobApplication',
  validatorHandler(getOneJobApplicationEmployeeSchema, 'body'),
  async (req, res, next) => {
    try {
      const { employeeId, offerId } = req.body;
      const jobApplication = await service.getOneJobApplicationEmployee(employeeId, offerId);
      res.status(200).json(jobApplication);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/offerJobApplications',
  validatorHandler(getOfferJobApplicationsSchema, 'body'),
  async (req, res, next) => {
    try {
      const { offerId } = req.body;
      const jobApplication = await service.getOfferJobApplications(offerId);
      res.status(200).json(jobApplication);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/employeeJobApplications',
  validatorHandler(getEmployeeJobApplicationsSchema, 'body'),
  async (req, res, next) => {
    try {
      const { employeeId } = req.body;
      const jobApplication = await service.getEmployeeJobApplications(employeeId);
      res.status(200).json(jobApplication);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/createJobApplication',
  validatorHandler(createJobApplicationSchema, 'body'),
  async (req, res, next) => {
    try {
      const { status, employeeId, offerId } = req.body;
      const createdJobApplication = await service.createJobApplication(status, employeeId, offerId);
      res.status(200).json(createdJobApplication);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/deleteJobApplication',
  validatorHandler(getOneJobApplicationEmployeeSchema, 'body'),
  async (req, res, next) => {
    try {
      const { employeeId, offerId } = req.body;         
      await service.deleteJobApplication(employeeId, offerId);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
