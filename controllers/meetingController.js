// // controllers/meetingController.js
// const models = require("../models");
// const { Meeting, StudyGroup } = models;

// // 🔹 Función auxiliar para determinar el estado de la reunión según la hora actual
// const getMeetingStatus = (startTime, endTime) => {
//   const now = new Date();
//   const start = new Date(startTime);
//   const end = new Date(endTime);

//   if (now < start) return "pendiente";
//   if (now >= start && now <= end) return "en_curso";
//   return "finalizado";
// };

// // 🔹 Crear una nueva reunión
// exports.createMeeting = async (req, res) => {
//   try {
//     const { studyGroupId, startTime, endTime, type, link, location } = req.body;

//     // Validar existencia del grupo
//     const group = await StudyGroup.findByPk(studyGroupId);
//     if (!group) {
//       return res.status(404).json({ message: "Grupo no encontrado" });
//     }

//     // Determinar estado inicial automáticamente
//     const status = getMeetingStatus(startTime, endTime);

//     // Crear la reunión
//     const meeting = await Meeting.create({
//       studyGroupId,
//       startTime,
//       endTime,
//       type,
//       link,
//       location,
//       status,
//     });

//     res.status(201).json({
//       message: "Reunión creada correctamente",
//       meeting,
//     });
//   } catch (error) {
//     console.error("Error al crear reunión:", error);
//     res.status(500).json({ message: "Error al crear la reunión" });
//   }
// };

// // 🔹 Obtener todas las reuniones de un grupo
// exports.getMeetingsByGroup = async (req, res) => {
//   try {
//     const { groupId } = req.params;

//     const meetings = await Meeting.findAll({ where: { studyGroupId:groupId } });

//     const updatedMeetings = await Promise.all(
//       meetings.map(async (meeting) => {
//         const newStatus = getMeetingStatus(meeting.startTime, meeting.endTime);
//         if (meeting.status !== newStatus) {
//           meeting.status = newStatus;
//           await meeting.save();
//         }
//         return meeting;
//       })
//     );

//     res.json(updatedMeetings);
//   } catch (error) {
//     console.error("Error al obtener reuniones:", error);
//     res.status(500).json({ message: "Error al obtener las reuniones" });
//   }
// };

// // 🔹 Obtener una reunión específica
// exports.getMeetingById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const meeting = await Meeting.findByPk(id);

//     if (!meeting) {
//       return res.status(404).json({ message: "Reunión no encontrada" });
//     }

//     const newStatus = getMeetingStatus(meeting.startTime, meeting.endTime);
//     if (meeting.status !== newStatus) {
//       meeting.status = newStatus;
//       await meeting.save();
//     }

//     res.json(meeting);
//   } catch (error) {
//     console.error("Error al obtener reunión:", error);
//     res.status(500).json({ message: "Error al obtener la reunión" });
//   }
// };

// // 🔹 Actualizar reunión
// exports.updateMeeting = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { startTime, endTime, type, link, location } = req.body;

//     const meeting = await Meeting.findByPk(id);
//     if (!meeting) {
//       return res.status(404).json({ message: "Reunión no encontrada" });
//     }

//     meeting.startTime = startTime || meeting.startTime;
//     meeting.endTime = endTime || meeting.endTime;
//     meeting.type = type || meeting.type;
//     meeting.link = link || meeting.link;
//     meeting.location = location || meeting.location;

//     meeting.status = getMeetingStatus(meeting.startTime, meeting.endTime);
//     await meeting.save();

//     res.json({ message: "Reunión actualizada correctamente", meeting });
//   } catch (error) {
//     console.error("Error al actualizar reunión:", error);
//     res.status(500).json({ message: "Error al actualizar la reunión" });
//   }
// };

// // 🔹 Eliminar reunión
// exports.deleteMeeting = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const meeting = await Meeting.findByPk(id);
//     if (!meeting) {
//       return res.status(404).json({ message: "Reunión no encontrada" });
//     }

//     await meeting.destroy();
//     res.json({ message: "Reunión eliminada correctamente" });
//   } catch (error) {
//     console.error("Error al eliminar reunión:", error);
//     res.status(500).json({ message: "Error al eliminar la reunión" });
//   }
// };

const models = require("../models");
const { Meeting, StudyGroup } = models;

// 🔹 Función auxiliar para determinar el estado de la reunión según la hora actual
const getMeetingStatus = (startTime, endTime) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) return "pendiente";
  if (now >= start && now <= end) return "en_curso";
  return "finalizado";
};

// 🔹 Crear una nueva reunión
exports.createMeeting = async (req, res) => {
  try {
    const { studyGroupId, startTime, endTime, type, link, location, topic_name } = req.body;

    // Validar existencia del grupo
    const group = await StudyGroup.findByPk(studyGroupId);
    if (!group) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }

    // Determinar estado inicial automáticamente
    const status = getMeetingStatus(startTime, endTime);

    // Crear la reunión
    const meeting = await Meeting.create({
      studyGroupId,
      startTime,
      endTime,
      type,
      link,
      location,
      topic_name,
      status,
    });

    res.status(201).json({
      message: "Reunión creada correctamente",
      meeting,
    });
  } catch (error) {
    console.error("Error al crear reunión:", error);
    res.status(500).json({ message: "Error al crear la reunión" });
  }
};

// 🔹 Obtener todas las reuniones de un grupo
exports.getMeetingsByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const meetings = await Meeting.findAll({ where: { studyGroupId: groupId } });

    const updatedMeetings = await Promise.all(
      meetings.map(async (meeting) => {
        const newStatus = getMeetingStatus(meeting.startTime, meeting.endTime);
        if (meeting.status !== newStatus) {
          meeting.status = newStatus;
          await meeting.save();
        }
        return meeting;
      })
    );

    res.json(updatedMeetings);
  } catch (error) {
    console.error("Error al obtener reuniones:", error);
    res.status(500).json({ message: "Error al obtener las reuniones" });
  }
};

// 🔹 Obtener una reunión específica
exports.getMeetingById = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findByPk(id);

    if (!meeting) {
      return res.status(404).json({ message: "Reunión no encontrada" });
    }

    const newStatus = getMeetingStatus(meeting.startTime, meeting.endTime);
    if (meeting.status !== newStatus) {
      meeting.status = newStatus;
      await meeting.save();
    }

    res.json(meeting);
  } catch (error) {
    console.error("Error al obtener reunión:", error);
    res.status(500).json({ message: "Error al obtener la reunión" });
  }
};

// 🔹 Actualizar reunión
exports.updateMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const { startTime, endTime, type, link, location, topic_name } = req.body;

    const meeting = await Meeting.findByPk(id);
    if (!meeting) {
      return res.status(404).json({ message: "Reunión no encontrada" });
    }

    meeting.startTime = startTime || meeting.startTime;
    meeting.endTime = endTime || meeting.endTime;
    meeting.type = type || meeting.type;
    meeting.link = link || meeting.link;
    meeting.location = location || meeting.location;
    meeting.topic_name = topic_name || meeting.topic_name;

    meeting.status = getMeetingStatus(meeting.startTime, meeting.endTime);
    await meeting.save();

    res.json({ message: "Reunión actualizada correctamente", meeting });
  } catch (error) {
    console.error("Error al actualizar reunión:", error);
    res.status(500).json({ message: "Error al actualizar la reunión" });
  }
};

// 🔹 Eliminar reunión
exports.deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    const meeting = await Meeting.findByPk(id);
    if (!meeting) {
      return res.status(404).json({ message: "Reunión no encontrada" });
    }

    await meeting.destroy();
    res.json({ message: "Reunión eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar reunión:", error);
    res.status(500).json({ message: "Error al eliminar la reunión" });
  }
};
