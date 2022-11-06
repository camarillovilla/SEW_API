// Configuración y conexión de Sequelize

//Sequelize puede gestionar el histórico de cambios mediante migraciones, donde cada elemento impactará en un cambio actual de la base de datos.

// Para definir las tablas, y sus relaciones, mediante código generado en el server, se utilizan Modelos

const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');
const setupModels = require('./../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
// Cadena de conexión
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialtec: 'postgres',
  logging: message => console.log(message),
});

// recibe la conexión
setupModels(sequelize);

// Toma los modelos y crea la estructura pero es mejor hacerlo por migraciones
// sequelize.sync();

module.exports = sequelize;
