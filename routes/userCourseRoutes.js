const express = require('express');
const router = express.Router();
const userCourseController = require('../controllers/userCourseController');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorize');   // Importación añadida

// Rutas protegidas por JWT
router.post('/add-courses', authMiddleware, userCourseController.addCoursesToUser);
router.get('/my-courses', authMiddleware, userCourseController.getUserCourses);



module.exports = router;
