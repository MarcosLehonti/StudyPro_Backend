// controllers/course.controller.js
const Course = require('../models/Course');
const logger = require('../logger'); // si ya usas logger como en user.controller

// 📚 Listar todos los cursos (todas las tuplas)
exports.listCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      attributes: ['id', 'name', 'code', 'group', 'schedule', 'semester'],
      order: [['createdAt', 'DESC']], // opcional
    });

    logger?.info?.(`📚 Cursos listados: ${courses.length}`);
    res.json(courses);
  } catch (err) {
    logger?.error?.(`❌ Error al listar cursos: ${err.message}`);
    res.status(500).json({ message: 'Error al listar cursos', error: err.message });
  }
};
