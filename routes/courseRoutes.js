const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');   // Importación añadida

// Rutas protegidas por JWT
router.get('/course-list', authMiddleware, courseController.listCourses);


module.exports = router;
