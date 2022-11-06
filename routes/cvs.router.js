const express = require('express');
// const passport = require('passport');
const CVService = require('../services/cv.service')
const validatorHandler = require('../middlewares/validator.handler');
// const { checkRoles } = require('../middlewares/auth.handler');
const { createCVSchema, updateCVSchema, getCVSchema } = require('../schemas/cv.schema');
const router = express.Router();
const service = new CVService();

router.post('/',
  validatorHandler(createCVSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCV = await service.create(body);
      res.status(201).json(newCV);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', async (req, res, next) => {
  try {
    const cvs = await service.getAll();
    res.json(cvs);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCVSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const cv = await service.getOne(id);
      res.json(cv);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCVSchema, 'params'),
  validatorHandler(updateCVSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
