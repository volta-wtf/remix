import express from 'express';
import cors from 'cors';
import { createServer } from 'net';

const app = express();

// Función para encontrar un puerto disponible
function findAvailablePort(startPort = 4445) {
  return new Promise((resolve, reject) => {
    const server = createServer();

    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => {
        resolve(port);
      });
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // Puerto ocupado, intentar con el siguiente
        findAvailablePort(startPort + 1)
          .then(resolve)
          .catch(reject);
      } else {
        reject(err);
      }
    });
  });
}

const DEFAULT_PORT = parseInt(process.env.CORS_TEST_PORT) || 4445;
let PORT = DEFAULT_PORT;

// Middleware CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'CORS test endpoint' });
});

app.post('/test-post', (req, res) => {
  res.json({ message: 'POST with CORS works', body: req.body });
});

// Iniciar el servidor con detección automática de puerto
(async () => {
  try {
    PORT = await findAvailablePort(DEFAULT_PORT);

    app.listen(PORT, () => {
      console.log(`🧪 CORS test server running on http://localhost:${PORT}`);
      if (PORT !== DEFAULT_PORT) {
        console.log(`⚠️  Puerto ${DEFAULT_PORT} ocupado, usando puerto ${PORT}`);
      }
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor CORS test:', error);
    process.exit(1);
  }
})();