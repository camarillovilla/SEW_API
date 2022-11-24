const express = require('express');
const EmployeeService = require('../services/employee.service');
const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const { createEmployeeSchema, updateEmployeeSchema, getEmployeeSchema } = require('../schemas/employee.schema');

const router = express.Router();
const service = new EmployeeService();

router.post('/',
  validatorHandler(createEmployeeSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newEmployee = await service.create(body);
      res.status(201).json(newEmployee);
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
      const employees = await service.getAll();
      res.status(200).json(employees)
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('Employee', 'Recruiter'),
  validatorHandler(getEmployeeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const employee = await service.getOne(id);
      res.json(employee);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('Employee', 'Recruiter'),
  validatorHandler(getEmployeeSchema, 'params'),
  validatorHandler(updateEmployeeSchema, 'body'),
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
  validatorHandler(getEmployeeSchema, 'params'),
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
