// app.js

// Nota: require('dotenv').config(); no es necesario aquí si lo incluyes en server.js
// La idea es que la configuración se haga en un solo lugar antes de iniciar todo.

console.log("APP_LOG: 1. Iniciando app.js");

// ----------------------------------------------------
// Importaciones de librerías y módulos
// ----------------------------------------------------
const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser'); // Nota: express.json() ya cubre esto.

console.log("APP_LOG: 2. Importando config/db");
const sequelize = require('./config/db');

// Rutas
console.log("APP_LOG: 3. Importando authRoutes");
const authRoutes = require('./routes/authRoutes');

console.log("APP_LOG: 4. Importando userRoutes");
const userRoutes = require('./routes/userRoutes');

// Importaciones con Try/Catch (Buena práctica para módulos opcionales)
try {
  console.log("APP_LOG: 5. Importando logRoutes");
  var logRoutes = require('./routes/LogRoutes');
} catch (err) {
  console.error("❌ ERROR AL IMPORTAR LogRoutes. Asegúrate de que el archivo exista y no tenga errores:", err);
  // No hacemos process.exit(1) aquí para que la app pueda iniciar sin logs si es un error no crítico.
}

console.log("APP_LOG: 6. Importando courseRoutes");
const courseRoutes = require('./routes/courseRoutes');

console.log("APP_LOG: 7. Importando userCourseRoutes");
const userCourse = require('./routes/userCourseRoutes');

console.log("APP_LOG: 8. Importando groupRoutes");
const groupRoutes = require('./routes/groupRoutes');

console.log("APP_LOG: 9. Importando meetingRoutes");
const meetingRoutes = require("./routes/meetingRoutes");

console.log("APP_LOG: 10. Importando api de gemini"); // Corregido a 10
const geminiRoutes = require('./routes/geminiRoutes');

console.log("APP_LOG: 11. Importando api de BI"); // Corregido a 11
const statsRoutes = require("./routes/statsRoutes");

// Modelos y relaciones
console.log("APP_LOG: 12. Importando models/index");
const models = require('./models');
// const { User, Course, Degree, StudyGroup, StudyGroupMember, Meeting } = models; // No es necesario desestructurar si solo usas 'models'

console.log("APP_LOG: 13. Modelos importados correctamente");

// Middlewares
console.log("APP_LOG: 14. Importando middlewares");
const authMiddleware = require('./middleware/authMiddleware');
const authorize = require('./middleware/authorize');

// ----------------------------------------------------
// Configuración de Express
// ----------------------------------------------------
console.log("APP_LOG: 15. Creando instancia de Express");
const app = express();

// Configuración de CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://study-pro-fronted.vercel.app'
  ],
  credentials: true
}));

// Middleware para parsear JSON
app.use(express.json());
// app.use(bodyParser.json()); // Comentado, ya que express.json() es suficiente en versiones modernas de Express

// Rutas
console.log("APP_LOG: 16. Montando rutas");
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
if (logRoutes) app.use('/api/logs', logRoutes); // Usar solo si se importó correctamente
app.use('/api/courses', courseRoutes);
app.use('/api/usercourse', userCourse);
app.use('/api/groups', groupRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/gemini", geminiRoutes);
app.use("/api/stats", statsRoutes);


// Sincronización de DB (Nota: se sincroniza al iniciar la app)
console.log("APP_LOG: 17. Iniciando sincronización de DB");
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Tablas sincronizadas con la base de datos');
  })
  .catch(err => {
    console.error('❌ Error al conectar con la base de datos:', err);
    // Nota: Es mejor dejar el manejo de fallos de DB en el listen o con un logger.
  });

console.log("APP_LOG: 18. Exportando app");
module.exports = app;
