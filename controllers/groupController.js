// controllers/groupController.js
const { StudyGroup, StudyGroupMember, Course, User } = require('../models');
const sequelize = require('../config/db');

module.exports = {
  // 🟢 Crear grupo
  async createGroup(req, res) {
    const userId = req.user.id;
    const { name, description, courseId } = req.body;

    try {
      // Verificar que el usuario esté inscrito al curso
      const [results] = await sequelize.query(
        `SELECT * FROM user_courses WHERE "userId" = :userId AND "courseId" = :courseId`,
        { replacements: { userId, courseId } }
      );

      if (!results.length) {
        return res.status(403).json({
          message: 'No puedes crear un grupo de una materia en la que no estás inscrito.',
        });
      }

      // Crear el grupo
      const newGroup = await StudyGroup.create({
        name,
        description,
        courseId,
        creatorId: userId,
        isPublic: true,
      });

      // Añadir al creador como miembro
     await StudyGroupMember.create({
        userId: userId,
        studyGroupId: newGroup.id,
     });


      res.status(201).json({ message: 'Grupo creado exitosamente', group: newGroup });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el grupo', error });
    }
  },

  // 🟢 Ver todos los grupos públicos
  async listPublicGroups(req, res) {
    try {
      const groups = await StudyGroup.findAll({
        where: { isPublic: true },
        include: [
          { model: User, as: 'creator', attributes: ['id', 'name', 'email'] },
          { model: Course, attributes: ['id', 'name', 'code'] },
        ],
      });
      res.json(groups);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los grupos', error });
    }
  },

  // 🟢 Unirse a un grupo
  async joinGroup(req, res) {
    const userId = req.user.id;
    const { groupId } = req.params;

    try {
      const group = await StudyGroup.findByPk(groupId, { include: [Course] });
      if (!group) return res.status(404).json({ message: 'Grupo no encontrado' });

      // Verificar que el usuario esté inscrito al curso del grupo
      const [results] = await sequelize.query(
        `SELECT * FROM user_courses WHERE "userId" = :userId AND "courseId" = :courseId`,
        { replacements: { userId, courseId: group.courseId } }
      );

      if (!results.length) {
        return res.status(403).json({
          message: 'No puedes unirte a un grupo de una materia que no tienes inscrita.',
        });
      }

      // Verificar si ya es miembro
      const existing = await StudyGroupMember.findOne({
        where: { userId: userId, studyGroupId: group.id },
      });

      if (existing) {
        return res.status(400).json({ message: 'Ya eres miembro de este grupo.' });
      }

      // Añadir al usuario
      await StudyGroupMember.create({
        userId: userId,
        studyGroupId: group.id,
      });

      res.status(200).json({ message: 'Te uniste al grupo exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al unirte al grupo', error });
    }
  },

  // 🟢 Ver grupos en los que el usuario está inscrito
  async myGroups(req, res) {
    const userId = req.user.id;

    try {
      const groups = await StudyGroup.findAll({
        include: [
          {
            model: User,
            through: { attributes: [] },
            where: { id: userId },
          },
          { model: Course, attributes: ['id', 'name', 'code'] },
        ],
      });

      res.json(groups);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener tus grupos', error });
    }
  },


// 🟣 Obtener detalles de un grupo (info + miembros + curso)
  async getGroupDetails(req, res) {
    const { groupId } = req.params;

    try {
      const group = await StudyGroup.findByPk(groupId, {
        include: [
          {
            model: Course,
            attributes: ['id', 'name', 'code', 'group', 'schedule', 'semester'],
          },
          {
            model: User,
            attributes: ['id', 'name', 'email', 'numberreg', 'semester', 'role'],
            through: { attributes: ['joinedAt'] },
          },
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'name', 'email'],
          },
        ],
      });

      if (!group) return res.status(404).json({ message: 'Grupo no encontrado' });

      res.json(group);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener detalles del grupo', error });
    }
  }

};


