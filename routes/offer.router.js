const express = require('express');
const OfferService = require('../services/offer.service')
const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const { getOfferSchema, getOffersByCategorySchema, getOneOfferSchema, updateOfferSchema, createOfferSchema, getOffersTitleSchema} = require('../schemas/offer.schema');
const router = express.Router();
const service = new OfferService();

router.post('/',
  passport.authenticate('jwt', { session: false }),
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
  passport.authenticate('jwt', { session: false }),
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
  passport.authenticate('jwt', { session: false }),
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
  passport.authenticate('jwt', { session: false }),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles('Recruiter'),
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
  passport.authenticate('jwt', { session: false }),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles('Recruiter'),
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

// router.delete('/deleteOffer',    
//   validatorHandler(getOneOfferSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.body;         
//       await service.deleteOffer(id);
//       res.status(204).json();
//     } catch (error) {
//       next(error);
//     }
//   }
// );

router.delete('/deleteOffer/:id',    
  validatorHandler(getOneOfferSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;         
      await service.deleteOffer(id);
      res.status(204).json();
    } catch (error) {
      next(error);
    }
  }
);

router.post('/getOffersTitle',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOffersTitleSchema, 'body'),
  async (req, res, next) => {
    try {
      const { title } = req.body;
      const offer = await service.getOffersTitle(title);
      res.status(200).json(offer);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
