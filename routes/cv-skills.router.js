const express = require('express');
const CVSkillService = require('../services/cv-skill.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createCVSkill, updateCVSkill, getCVSkill } = require('../schemas/cv-skill.schema');

const router = express.Router();
const service = new CVSkillService();

router.post('/',
  validatorHandler(createCVSkill, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCVSkill = await service.create(body);
      res.status(201).json(newCVSkill);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCVSkill, 'params'),
  validatorHandler(updateCVSkill, 'body'),
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
  validatorHandler(getCVSkill, 'params'),
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
