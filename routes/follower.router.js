const express = require('express');
const FollowerService = require('../services/follower.service')
const validatorHandler = require('../middlewares/validator.handler');
const passport = require('passport');
const { getFollowersByRecluiterSchema } = require('../schemas/follower.schema');
const router = express.Router();
const service = new FollowerService();

router.post('/',
  validatorHandler(getFollowersByRecluiterSchema, 'body'),
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { recruiterId } = req.body;
      const recuiterFollowers = await service.getFollowersByRecluiter(recruiterId);
      res.status(200).json(recuiterFollowers);

    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
