const express = require('express');
const passport = require('passport');
const authRouter = require('./auth.router');
const profileRouter = require('./profile.router');
const recruitersRouter = require('./recruiters.router');
const employeesRouter = require('./employees.router');
const cvsRouter = require('./cvs.router');
const cvLenguges = require('./cv-lenguages.router');
const cvSkills = require('./cv-skills.router');
const cvWorkExperiences = require('./cv-work-experiences.router');
const cvAcademicTrainings = require('./cv-academic-trainings.router');
const cvCertifications = require('./cv-certifications.router');
const recruiterOffers = require('./offer.router');
const { checkRoles } = require('../middlewares/auth.handler');

function routerApi(app) {
  // Global Path
  const router = express.Router();
  app.use('/api/v1', router);

  router.use('/auth', authRouter);
  router.use('/profile', passport.authenticate('jwt', { session: false }), checkRoles('Employee'), profileRouter);
  router.use('/recruiters', recruitersRouter);
  router.use('/employees', employeesRouter);
  router.use('/cvs', passport.authenticate('jwt', { session: false }), checkRoles('Employee'), cvsRouter);
  router.use('/cv-lenguages', passport.authenticate('jwt', { session: false }), checkRoles('Employee'), cvLenguges);
  router.use('/cv-skills', passport.authenticate('jwt', { session: false }), checkRoles('Employee'), cvSkills);
  router.use('/cv-work-experiences', passport.authenticate('jwt', { session: false }), checkRoles('Employee'), cvWorkExperiences);
  router.use('/cv-academic-trainings', passport.authenticate('jwt', { session: false }), checkRoles('Employee'), cvAcademicTrainings);
  router.use('/cv-certifications', passport.authenticate('jwt', { session: false }), checkRoles('Employee'), cvCertifications);
  router.use('/recruiter-offers', recruiterOffers);
}

module.exports = routerApi;
