// routes/meetingRoutes.js
const express = require("express");
const router = express.Router();
const meetingController = require("../controllers/meetingController");
const authMiddleware = require("../middleware/authMiddleware");

// Crear una nueva reunión
router.post("/", authMiddleware, meetingController.createMeeting);

// Obtener todas las reuniones de un grupo
router.get("/group/:groupId", authMiddleware, meetingController.getMeetingsByGroup);

// Obtener una reunión específica por ID
router.get("/:id", authMiddleware, meetingController.getMeetingById);

// Actualizar una reunión
router.put("/:id", authMiddleware, meetingController.updateMeeting);

// Eliminar una reunión
router.delete("/:id", authMiddleware, meetingController.deleteMeeting);

module.exports = router;
