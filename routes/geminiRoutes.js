console.log("✅ Cargando geminiRoutes...");

const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const geminiController = require('../controllers/geminiController');

// Rutas protegidas por JWT
router.post('/ask', authMiddleware, geminiController.askGemini);


module.exports = router;
