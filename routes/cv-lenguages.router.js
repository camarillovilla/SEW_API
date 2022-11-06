const express = require('express');
const CVLenguagesService = require('../services/cv-lenguage.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCVLenguage, updateCVLenguage, getCVLenguage } = require('../schemas/cv-lenguage.schema');

const router = express.Router();
const service = new CVLenguagesService();

router.post('/',
  validatorHandler(createCVLenguage, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCVLenguage = await service.create(body);
      res.status(201).json(newCVLenguage);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCVLenguage, 'params'),
  validatorHandler(updateCVLenguage, 'body'),
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
  validatorHandler(getCVLenguage, 'params'),
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
