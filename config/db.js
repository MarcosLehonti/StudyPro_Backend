// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize(
//   process.env.DB_NAME,      // nombre de la BD
//   process.env.DB_USER,      // usuario
//   process.env.DB_PASSWORD,  // contraseña
//   {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',    // o 'mysql' según tu BD
//   }
// );

// module.exports = sequelize;

const { Sequelize } = require('sequelize');
//require('dotenv').config();

// Conexión usando DATABASE_URL de Neon
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Necesario para Neon
    },
  },
  logging: false,
});

module.exports = sequelize;

