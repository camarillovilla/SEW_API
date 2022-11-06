const express = require('express');
const CVAcademicTrainingService = require('../services/cv-academic-training.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCVAcademicTraining, updateCVAcademicTraining, getCVAcademicTraining } = require('../schemas/cv-academic-training.schema');

const router = express.Router();
const service = new CVAcademicTrainingService();

router.post('/',
  validatorHandler(createCVAcademicTraining, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCVAcademicTraining = await service.create(body);
      res.status(201).json(newCVAcademicTraining);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCVAcademicTraining, 'params'),
  validatorHandler(updateCVAcademicTraining, 'body'),
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
  validatorHandler(getCVAcademicTraining, 'params'),
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
