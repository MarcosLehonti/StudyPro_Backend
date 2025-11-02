// // models/StudyGroup.js
// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");
// const User = require("../models/user");
// const Course = require("./Course");

// const StudyGroup = sequelize.define(
//   "StudyGroup",
//   {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: { len: [2, 120] },
//     },
//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     // Puedes agregar un campo para controlar privacidad (ej: público o solo con invitación)
//     isPublic: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: true,
//     },
//   },
//   {
//     tableName: "study_groups",
//     timestamps: true,
//   }
// );

// // Relaciones
// // Un usuario crea muchos grupos
// User.hasMany(StudyGroup, { foreignKey: "creatorId" });
// StudyGroup.belongsTo(User, { foreignKey: "creatorId", as: "creator" });

// // Un grupo pertenece a un curso
// Course.hasMany(StudyGroup, { foreignKey: "courseId" });
// StudyGroup.belongsTo(Course, { foreignKey: "courseId" });

// module.exports = StudyGroup;


const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const StudyGroup = sequelize.define('StudyGroup', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [2, 120] },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'study_groups',
  timestamps: true,
});

module.exports = StudyGroup;
