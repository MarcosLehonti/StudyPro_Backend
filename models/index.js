// // models/index.js
// const User = require('./user');
// const Course = require('./Course');
// const Degree = require('./Degree');
// const StudyGroup = require('./StudyGroup');
// const StudyGroupMember = require('./StudyGroupMember');

// // Relaciones existentes
// User.belongsToMany(Course, {
//   through: 'user_courses',
//   foreignKey: 'userId',
//   otherKey: 'courseId',
// });

// Course.belongsToMany(User, {
//   through: 'user_courses',
//   foreignKey: 'courseId',
//   otherKey: 'userId',
// });

// Degree.belongsToMany(Course, {
//   through: 'degree_courses',
//   foreignKey: 'degreeId',
//   otherKey: 'courseId',
// });

// Course.belongsToMany(Degree, {
//   through: 'degree_courses',
//   foreignKey: 'courseId',
//   otherKey: 'degreeId',
// });

// // Relaciones nuevas
// StudyGroup.belongsTo(User, { foreignKey: 'createdBy' });
// StudyGroup.belongsToMany(User, { through: StudyGroupMember });
// User.belongsToMany(StudyGroup, { through: StudyGroupMember });

// module.exports = { 
//   User, 
//   Course, 
//   Degree, 
//   StudyGroup, 
//   StudyGroupMember 
// };


const User = require('./user');
const Course = require('./Course');
const Degree = require('./Degree');
const StudyGroup = require('./StudyGroup');
const StudyGroupMember = require('./StudyGroupMember');
const Meeting = require('./Meeting');

// 🔹 Relaciones entre User y Course
User.belongsToMany(Course, {
  through: 'user_courses',
  foreignKey: 'userId',
  otherKey: 'courseId',
});
Course.belongsToMany(User, {
  through: 'user_courses',
  foreignKey: 'courseId',
  otherKey: 'userId',
});

// 🔹 Relaciones entre Degree y Course
Degree.belongsToMany(Course, {
  through: 'degree_courses',
  foreignKey: 'degreeId',
  otherKey: 'courseId',
});
Course.belongsToMany(Degree, {
  through: 'degree_courses',
  foreignKey: 'courseId',
  otherKey: 'degreeId',
});

// 🔹 Relaciones de grupos de estudio
User.hasMany(StudyGroup, { foreignKey: 'creatorId' });
StudyGroup.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });

Course.hasMany(StudyGroup, { foreignKey: 'courseId' });
StudyGroup.belongsTo(Course, { foreignKey: 'courseId' });

User.belongsToMany(StudyGroup, {
  through: StudyGroupMember,
  foreignKey: 'userId',
  otherKey: 'studyGroupId',
});
StudyGroup.belongsToMany(User, {
  through: StudyGroupMember,
  foreignKey: 'studyGroupId',
  otherKey: 'userId',
});

// 🔹 Relaciones de reuniones
StudyGroup.hasMany(Meeting, { foreignKey: 'studyGroupId' });
Meeting.belongsTo(StudyGroup, { foreignKey: 'studyGroupId' });

module.exports = {
  User,
  Course,
  Degree,
  StudyGroup,
  StudyGroupMember,
  Meeting,
};
