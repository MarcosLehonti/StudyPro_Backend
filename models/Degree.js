// // models/Degree.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const Degree = sequelize.define('Degree', {
//   name: {
//     type: DataTypes.STRING(120),
//     allowNull: false,
//     unique: true,
//     validate: { len: [2, 120] },
//   },
// }, {
//   tableName: 'degrees',
//   timestamps: true,
// });

// module.exports = Degree;


const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Degree = sequelize.define('Degree', {
  name: {
    type: DataTypes.STRING(120),
    allowNull: false,
    unique: true,
    validate: { len: [2, 120] },
  },
}, {
  tableName: 'degrees',
  timestamps: true,
});

module.exports = Degree;
