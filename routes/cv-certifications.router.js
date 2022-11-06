const express = require('express');
const CVCertificationService = require('../services/cv-certification.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCVCertification, updateCVCertification, getCVCertification } = require('../schemas/cv-certification.schema');

const router = express.Router();
const service = new CVCertificationService();

router.post('/',
  validatorHandler(createCVCertification, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCVCertification = await service.create(body);
      res.status(201).json(newCVCertification);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCVCertification, 'params'),
  validatorHandler(updateCVCertification, 'body'),
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
  validatorHandler(getCVCertification, 'params'),
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
