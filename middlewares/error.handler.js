// Un Middleware es un manejador de peticiones antes de que lleguen a su endpoint final

const { ValidationError } = require("sequelize");

// Un middleware es una función que se puede ejecutar antes o después del manejo de una ruta. Esta función tiene acceso al objeto Request, Response y la función next().

// Las funciones middleware suelen ser utilizadas como mecanismo para verificar niveles de acceso antes de entrar en una ruta, manejo de errores, validación de datos, etc.

function logErrors(err, req, res, next) {
  console.error(err);
  // Middleware de tipo error
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }

  next(err);
}

function ormErrorHandler(err, req, res, next) {
  // Si el error viene desde el sequalize
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      error: err.errors
    });
  }

  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
