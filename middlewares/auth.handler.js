const boom = require('@hapi/boom');
const { config } = require('./../config/config');

function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];

  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
}

function checkEmployeeRole(req, res, next) {
  const user = req.user;
  if (user && user.role === 'Employee') {
    next();
  } else {
    next(boom.forbidden());
  }
}

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.forbidden());
    }
  }
}

function checkAuthenticaded(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(boom.unauthorized());
  }
}


module.exports = { checkApiKey, checkEmployeeRole, checkRoles, checkAuthenticaded };
