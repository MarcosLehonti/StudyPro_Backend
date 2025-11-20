const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");

// Ruta principal de estadísticas
router.get("/", statsController.getStats);

module.exports = router;
