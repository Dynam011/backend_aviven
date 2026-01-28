const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // Desactiva logs de SQL en consola
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Cambia a true si tienes certificado válido
      }
    }
  }
);

module.exports = sequelize;