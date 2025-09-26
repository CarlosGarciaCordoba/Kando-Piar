import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/database';
import authRoutes from './api/routes/auth.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
// ID de build para depuración (reinicia en cada proceso)
const BUILD_ID = `build-${Date.now()}`;

// Middlewares
app.use(cors());
app.use(express.json());
// Header de versión en todas las respuestas
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-App-Build', BUILD_ID);
  next();
});

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (_req: Request, res: Response) => {
  res.json({ 
    message: 'API Kando PIAR funcionando correctamente',
    build: BUILD_ID
  });
});

// Ruta de diagnóstico para identificar el proceso que responde
app.get('/whoami', (_req: Request, res: Response) => {
  res.json({
    build: BUILD_ID,
    pid: process.pid,
    cwd: process.cwd(),
    execPath: process.execPath,
    uptimeSeconds: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Ruta de prueba para la base de datos
app.get('/db-test', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      message: 'Conexión exitosa a la base de datos',
      timestamp: result.rows[0].now
    });
  } catch (error: any) {
    res.status(500).json({ 
      message: 'Error conectando a la base de datos',
      error: error.message 
    });
  }
});

const PORT: number = Number(process.env.PORT) || 3000;

// 404 para rutas no encontradas
app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

// Middleware global de errores (debe ir al final)
app.use(errorHandler);

// Verificar conexión a la base de datos al iniciar el servidor
pool.query('SELECT NOW()', (error, result) => {
  if (error) {
    console.error('❌ Error conectando a la base de datos al iniciar el servidor:', error.message);
    process.exit(1); // Detiene el servidor si no hay conexión
  } else {
    console.log('✅ Conexión exitosa a la base de datos al iniciar el servidor');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`🆔 BUILD_ID: ${BUILD_ID}`);
      console.log(`📌 PID: ${process.pid}`);
      console.log(`📂 CWD: ${process.cwd()}`);
    });
  }
});

export default app;