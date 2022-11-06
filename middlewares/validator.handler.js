const boom = require('@hapi/boom');

// creador de un middlewares dinamicos.

// Recibe un esquema y le vamos  a decir donde encontrar la información
function validatorHandler(schema, property) {
  // Closure
  return (req, res, next) => {
    const data = req[property]
    // abortEarly para encontrar todaos los errores para enviarlos
    const { error } = schema.validate(data, {abortEarly: false})

    if (error) {
      next(boom.badRequest(error));
    }

    next();
  }
}

module.exports = validatorHandler;
