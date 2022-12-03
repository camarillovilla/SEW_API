const express = require('express');
const CVWorkExperienceService = require('../services/cv-work-experience.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCVWorkExperience, updateCVWorkExperience, getCVWorkExperience } = require('../schemas/cv-work-experience.schema');

const router = express.Router();
const service = new CVWorkExperienceService();

router.post('/',
  validatorHandler(createCVWorkExperience, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCVWorkExperience = await service.create(body);
      res.status(201).json(newCVWorkExperience);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(updateCVWorkExperience, 'body'),
  validatorHandler(getCVWorkExperience, 'params'),
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
  validatorHandler(getCVWorkExperience, 'params'),
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

