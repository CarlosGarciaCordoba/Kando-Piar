import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import { loginValidator } from '../validators/auth.validator';

const router = Router();

// Ruta de autenticación
router.post('/login', loginValidator, login);

// Exportar el router
export default router;
