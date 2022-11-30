const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middlewares/validator.handler');
const { loginSchema, recoverySchema, changePasswordSchema } = require('../schemas/auth.schema');
const AuthService = require('./../services/auth.service');
const service = new AuthService();
const router = express.Router();

router.post('/login',
  validatorHandler(loginSchema, 'body'),
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.status(200).json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      // const provider = user.provider;
      const accessToken = service.signToken(user).token;

      res.cookie('access_token', accessToken, {
        httpOnly: false,
        secure: false
      });

      res.status(200).redirect('http://localhost:8080/profile');

      // if (provider === 'Google') {
      //   const accessToken = service.signToken(user);

      //   res.cookie('access_token', accessToken, {
      //     httpOnly: true,
      //     secure: false
      //   });
      //   res.status(200).redirect('http://localhost:8080/profile');
      // }
      // else {
      //   res.status(403).redirect('http://localhost:8080/login');
      // }
    } catch (error) {
      next(error);
    }
  }
);

router.get('/google/',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ]
  }),
);

router.post('/recovery',
  validatorHandler(recoverySchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const message = await service.sendRecovery(email);
      res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/change-password',
  validatorHandler(changePasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const response = await service.changePassword(token, newPassword);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/verify-token',
  async (req, res, next) => {
    try {
      const { token } = req.body;
      const isVerifyToken = await service.verifyToken(token);

      if (isVerifyToken) {
        res.sendStatus(200);
      } else {
        res.status(204).redirect('http://localhost:8080/login');
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
