const express = require('express');
const passport = require('passport');
const UserService = require('../services/user.service');
const serviceUser = new UserService();

const router = express.Router();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const id = req.user.sub
      const role = req.user.role
      const user = await serviceUser.getOne(id, role);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
