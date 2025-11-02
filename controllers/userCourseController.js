const { User, Course } = require('../models');

// Asignar cursos a un usuario (inscripción)
exports.addCoursesToUser = async (req, res) => {
  const { courseIds } = req.body; // array de IDs de cursos
  const userId = req.user.id; // ⚡ viene del middleware de autenticación (JWT)

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const courses = await Course.findAll({ where: { id: courseIds } });
    if (!courses.length) {
      return res.status(400).json({ message: 'No se encontraron cursos válidos' });
    }

    // Asociar cursos seleccionados
    await user.addCourses(courses);

    res.json({ message: 'Cursos inscritos correctamente', courses });
  } catch (error) {
    console.error('❌ Error al asignar cursos:', error);
    res.status(500).json({ message: 'Error al asignar cursos', error });
  }
};

// Obtener cursos inscritos de un usuario
exports.getUserCourses = async (req, res) => {
  const userId = req.user.id; // ⚡ autenticado

  try {
    const user = await User.findByPk(userId, {
      include: [{ model: Course, through: { attributes: [] } }],
    });

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json(user.Courses);
  } catch (error) {
    console.error('❌ Error al obtener cursos del usuario:', error);
    res.status(500).json({ message: 'Error al obtener cursos', error });
  }
};

// Eliminar curso de un usuario (desinscribirse)
exports.removeCourseFromUser = async (req, res) => {
  const userId = req.user.id;
  const { courseId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const course = await Course.findByPk(courseId);
    if (!course) return res.status(404).json({ message: 'Curso no encontrado' });

    await user.removeCourse(course);

    res.json({ message: `Curso ${courseId} eliminado correctamente` });
  } catch (error) {
    console.error('❌ Error al eliminar curso del usuario:', error);
    res.status(500).json({ message: 'Error al eliminar curso', error });
  }
};
