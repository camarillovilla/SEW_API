const express = require('express');
const OfferService = require('../services/offer.service')
const validatorHandler = require('../middlewares/validator.handler');
// const { checkRoles } = require('../middlewares/auth.handler');
//const { createCVSchema, updateCVSchema, getCVSchema } = require('../schemas/cv.schema');
const { getOfferSchema, getOffersByCategorySchema, getOneOfferSchema, updateOfferSchema, createOfferSchema} = require('../schemas/offer.schema');
const router = express.Router();
const service = new OfferService();

router.post('/',
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

router.post('/offersNumber',
  validatorHandler(getOfferSchema, 'body'),
  async (req, res, next) => {
    try {
      const { recruiterId } = req.body;
      const recuiterOffersNumber = await service.getNumberOfRecruiterOffers(recruiterId);
      res.status(200).json(recuiterOffersNumber);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/offersCategory',
  validatorHandler(getOffersByCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { category } = req.body;
      const offers = await service.getOffersByCategory(category);
      res.status(200).json(offers);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/oneOffer',
  validatorHandler(getOneOfferSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.body;
      const offer = await service.getOneOffer(id);
      res.status(200).json(offer);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/createOffer',
  validatorHandler(createOfferSchema, 'body'),
  async (req, res, next) => {
    try {
      const { offerData } = req.body;
      const offer = await service.createOffer(offerData);
      res.status(201).json(offer);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/',
  async (req, res, next) => {
    try {
      const offers = await service.getAllOffers();
      res.status(200).json(offers);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/',   
  validatorHandler(updateOfferSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id, changes } = req.body;      
      res.json(await service.updateOffer(id, changes));
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
