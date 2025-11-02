
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const Meeting = sequelize.define('Meeting', {
//   startTime: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
//   endTime: {
//     type: DataTypes.DATE,
//     allowNull: false,
//   },
//   type: {
//     type: DataTypes.ENUM('virtual', 'presencial'),
//     allowNull: false,
//   },
//   link: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   location: {
//     type: DataTypes.STRING,
//     allowNull: true,
//   },
//   status: {
//     type: DataTypes.ENUM('pendiente', 'en_curso', 'finalizado'),
//     defaultValue: 'pendiente',
//   },
// }, {
//   tableName: 'meetings',
//   timestamps: true,
// });

// module.exports = Meeting;


const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Meeting = sequelize.define('Meeting', {
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('virtual', 'presencial'),
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pendiente', 'en_curso', 'finalizado'),
    defaultValue: 'pendiente',
  },
  topic_name: { // ✅ Nuevo atributo agregado
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'meetings',
  timestamps: true,
});

module.exports = Meeting;

