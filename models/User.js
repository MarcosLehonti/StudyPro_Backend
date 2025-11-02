// const {DataTypes} = require('sequelize');
// const sequelize = require('../config/db');
// const User = sequelize.define('User', {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     email: {
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false,
//     },
//     //Numero de registro
//     numberreg: {
//         type: DataTypes.INTEGER,
//         unique: true,
//         allowNull: false,
//     },
//      semester: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     role: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: 'estudiante',   // Puedes definir el rol por defecto aquí
//         validate: {
//             isIn: [['admin', 'estudiante', 'auxiliar']]  // Solo estos roles son válidos
//         }
//     }
// }, {
//     tableName: 'users',
//     timestamps: true,
// });




// module.exports = User;



const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  numberreg: {
    type: DataTypes.INTEGER,
    unique: true,
    allowNull: false,
  },
  semester: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'estudiante',
    validate: {
      isIn: [['admin', 'estudiante', 'auxiliar']],
    },
  },
}, {
  tableName: 'users',
  timestamps: true,
});

module.exports = User;
