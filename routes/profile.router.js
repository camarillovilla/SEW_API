const express = require('express');
const passport = require('passport');
const CVService = require('../services/cv.service')
const service = new CVService();

const router = express.Router();

router.get('/my-cv',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const cv = await service.getOneByUser(user.sub);
      res.json(cv);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
