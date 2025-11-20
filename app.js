console.log("APP_LOG: 1. Iniciando app.js");
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');  // lo puedes quitar si no lo usas
const fs = require('fs');
const path = require('path');

console.log("APP_LOG: 2. Importando config/db");
const sequelize = require('./config/db');

console.log("APP_LOG: 3. Importando authRoutes");
const authRoutes = require('./routes/authRoutes');
console.log("APP_LOG: 4. Importando userRoutes");
const userRoutes = require('./routes/userRoutes');
console.log("APP_LOG: 5. Importando logRoutes");
const logRoutes = require('./routes/LogRoutes');
console.log("APP_LOG: 6. Importando courseRoutes");
const courseRoutes = require('./routes/courseRoutes');
console.log("APP_LOG: 7. Importando userCourseRoutes");
const userCourse = require('./routes/userCourseRoutes');
console.log("APP_LOG: 8. Importando groupRoutes");
const groupRoutes = require('./routes/groupRoutes');
console.log("APP_LOG: 9. Importando meetingRoutes (El punto crítico)");
const meetingRoutes = require("./routes/meetingRoutes");
console.log("APP_LOG: 12. Importando api de gemini");
const geminiRoutes = require('./routes/geminiRoutes');
console.log("APP_LOG: 12.5. Importando api de BI");

const statsRoutes = require("./routes/statsRoutes");

console.log("APP_LOG: 11. Importando models/index");
// ✅ importa todos los modelos y sus relaciones
const models = require('./models'); 
const { User, Course, Degree, StudyGroup, StudyGroupMember, Meeting } = models;
console.log("APP_LOG: 12. Modelos importados correctamente");


console.log("APP_LOG: 13. Importando middlewares");
const authMiddleware = require('./middleware/authMiddleware');
const authorize = require('./middleware/authorize');

require('dotenv').config();

console.log("APP_LOG: 14. Creando instancia de Express");
const app = express();

// 🔵 Configuración de CORS
app.use(cors({
  origin: 'http://localhost:5173', // o tu frontend en prod
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas
console.log("APP_LOG: 15. Montando rutas");
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/usercourse', userCourse);
app.use('/api/groups', groupRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/gemini", geminiRoutes);
app.use("/api/stats", statsRoutes);


console.log("APP_LOG: 16. Iniciando sincronización de DB");
// 🔹 Conexión con la base deP datos
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Tablas sincronizadas con la base de datos');
  })
  .catch(err => {
    console.error('❌ Error al conectar con la base de datos', err);
  });

console.log("APP_LOG: 17. Exportando app");
module.exports = app;