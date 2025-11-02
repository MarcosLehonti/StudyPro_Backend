// server.js
require('dotenv').config();
const http = require('http');
const app = require('./app');
const logger = require('./logger');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`🚀 Backend running on http://localhost:${PORT}`);
});

// Opcional: manejo de errores no capturados
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', { message: err?.message, stack: err?.stack });
});
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', { message: err?.message, stack: err?.stack });
  process.exit(1);
});
