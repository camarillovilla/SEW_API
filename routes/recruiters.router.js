const express = require('express');
const RecruiterService = require('../services/recruiter.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createRecruiterSchema, updateRecruiterSchema, getRecruiterSchema } = require('../schemas/recruiter.schema');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const router = express.Router();
const service = new RecruiterService();

router.post('/',
  validatorHandler(createRecruiterSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newRecruiter = await service.create(body);
      res.status(201).json(newRecruiter);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('Employee', 'Recruiter'),
  async (req, res, next) => {
    try {
      const recruiters = await service.getAll();
      res.status(200).json(recruiters);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('Employee', 'Recruiter'),
  validatorHandler(getRecruiterSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const recruiter = await service.getOne(id);
      res.json(recruiter);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('Employee', 'Recruiter'),
  validatorHandler(getRecruiterSchema, 'params'),
  validatorHandler(updateRecruiterSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(200).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('Employee', 'Recruiter'),
  validatorHandler(getRecruiterSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
