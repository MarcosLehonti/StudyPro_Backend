// controllers/statsController.js
const { Op } = require("sequelize");
const User = require("../models/User");
const StudyGroup = require("../models/StudyGroup");
const sequelize = require("../config/db"); // ✅ conexión a la BD

// 📊 Obtener estadísticas generales del sistema
exports.getStats = async (req, res) => {
  try {
    // 🔹 Fecha actual
    const today = new Date();

    // 🔹 Calcular fechas
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const startOfYear = new Date(today.getFullYear(), 0, 1);

    // 🔹 Obtener métricas de usuarios registrados
    const usersToday = await User.count({
      where: { createdAt: { [Op.gte]: yesterday } },
    });

    const usersWeek = await User.count({
      where: { createdAt: { [Op.gte]: lastWeek } },
    });

    const usersYear = await User.count({
      where: { createdAt: { [Op.gte]: startOfYear } },
    });

    // 🔹 Grupos más populares (TOP 5)
    const topGroups = await sequelize.query(
      `
      SELECT "id", "name",
        (
          SELECT COUNT(*)
          FROM study_group_members AS sgm
          WHERE sgm."studyGroupId" = "StudyGroup"."id"
        ) AS "memberCount"
      FROM "study_groups" AS "StudyGroup"
      ORDER BY "memberCount" DESC
      LIMIT 5;
      `,
      { type: sequelize.QueryTypes.SELECT }
    );

    // ✅ Enviar respuesta al frontend
    res.json({
      success: true,
      users: {
        today: usersToday,
        week: usersWeek,
        year: usersYear,
      },
      topGroups,
    });
  } catch (error) {
    console.error("❌ Error al obtener estadísticas:", error);
    res.status(500).json({ message: "Error al obtener estadísticas" });
  }
};
