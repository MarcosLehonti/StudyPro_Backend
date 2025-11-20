// server.js

// 1. Cargar variables de entorno (debe ser lo primero)
require('dotenv').config();

// 2. Importar módulos esenciales para el servidor
const http = require('http');
const app = require('./app'); // <-- IMPORTA LA CONFIGURACIÓN DE EXPRESS
const logger = require('./logger'); // Importa tu logger

// 3. Definir el puerto
// Usa process.env.PORT, que debería venir de tu archivo .env (que pusiste 4000)
const PORT = process.env.PORT || 4000;

// 4. Crear el servidor HTTP y pasarle la app de Express
const server = http.createServer(app);

// 5. Iniciar el servidor (Este es el código que evita que se cierre la consola)
server.listen(PORT, () => {
  // Aquí se ejecuta después de que el servidor está listo para recibir peticiones
  logger.info(`🚀 Backend running on http://localhost:${PORT}`);
  console.log(`\n🎉 SERVER OK: Servidor escuchando en http://localhost:${PORT}`); // Mensaje claro de éxito
});

// Opcional: manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', { message: err?.message, stack: err?.stack });
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', { message: err?.message, stack: err?.stack });
  process.exit(1);
});