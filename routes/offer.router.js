const express = require('express');
const OfferService = require('../services/offer.service')
const validatorHandler = require('../middlewares/validator.handler');
// const { checkRoles } = require('../middlewares/auth.handler');
const { createCVSchema, updateCVSchema, getCVSchema } = require('../schemas/cv.schema');
const { getOfferSchema } = require('../schemas/offer.schema');
const router = express.Router();
const service = new OfferService();

router.get('/',  
  validatorHandler(getOfferSchema, 'body'),
  async (req, res, next) => {
    try {
      const { recruiterId } = req.body;
      const recuiterOffers = await service.getRecruterOffers(recruiterId);
      res.status(200).json(recuiterOffers);
      
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
