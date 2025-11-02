// // models/course.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const Course = sequelize.define('Course', {
  
//   // Nombre visible: "Cálculo I", "Programación 1", etc.
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     validate: { len: [2, 120] },
//   },

//   // Código de la materia en el pensum: "MAT-101", "INF-201", etc. (opcional pero útil)
//   code: {
//     type: DataTypes.STRING(20),
//     allowNull: true,
//   },

//   // Grupo/sección: "A", "B", "1", "2", etc.
//   group: {
//     type: DataTypes.STRING(10),
//     allowNull: false,
//   },

//   // Horario libre: "Lu-Mi 08:00-10:00" (si prefieres estructurado, podrías usar JSON)
//   schedule: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },

//   // Semestre académico en el que se ofrece (ej: 1..12 o 2025-1)
//   semester: {
//     type: DataTypes.STRING(20), // si prefieres número puro: DataTypes.INTEGER
//     allowNull: true,
//   },
// }, {
//   tableName: 'courses',
//   timestamps: true,
//   indexes: [
//     // Evita duplicar la misma oferta (mismo code+group+semester)
//     { unique: true, fields: ['code', 'group', 'semester'] },
//   ],
// });

// module.exports = Course;


const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Course = sequelize.define('Course', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { len: [2, 120] },
  },
  code: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  group: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  schedule: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  semester: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
}, {
  tableName: 'courses',
  timestamps: true,
  indexes: [
    { unique: true, fields: ['code', 'group', 'semester'] },
  ],
});

module.exports = Course;
