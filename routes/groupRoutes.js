const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middleware/authMiddleware');

// Crear grupo (solo si está inscrito al curso)
router.post('/', authMiddleware, groupController.createGroup);

// Listar todos los grupos públicos
router.get('/', authMiddleware, groupController.listPublicGroups);

// Unirse a un grupo (solo si tiene el curso)
router.post('/:groupId/join', authMiddleware, groupController.joinGroup);

// Ver grupos donde el usuario participa
router.get('/my-groups', authMiddleware, groupController.myGroups);

//ver detalle de los grupos
router.get('/:groupId/details', authMiddleware, groupController.getGroupDetails);

module.exports = router;
