// // models/StudyGroupMember.js
// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");
// const User = require("../models/user");
// const StudyGroup = require("./StudyGroup");

// const StudyGroupMember = sequelize.define(
//   "StudyGroupMember",
//   {
//     joinedAt: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     tableName: "study_group_members",
//     timestamps: false, // porque ya guardamos `joinedAt`
//   }
// );

// // Relaciones
// User.belongsToMany(StudyGroup, {
//   through: StudyGroupMember,
//   foreignKey: "userId",
//   otherKey: "studyGroupId",
// });

// StudyGroup.belongsToMany(User, {
//   through: StudyGroupMember,
//   foreignKey: "studyGroupId",
//   otherKey: "userId",
// });

// module.exports = StudyGroupMember;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const StudyGroupMember = sequelize.define('StudyGroupMember', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  studyGroupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'study_groups',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  joinedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'study_group_members',
  timestamps: false,
});

module.exports = StudyGroupMember;
