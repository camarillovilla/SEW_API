const express = require('express');
const passport = require('passport');
const EmployeeService = require('../services/employee.service');
const UserService = require('../services/user.service');
// const service = new CVService();
const serviceEmployee = new EmployeeService();
const serviceUser = new UserService();

const router = express.Router();

router.get('/my-cv',
  // passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const id = req.user.sub
      const user = await serviceUser.getOne(id);

      // const employee = await serviceEmployee.getOne(user.employeeId);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
