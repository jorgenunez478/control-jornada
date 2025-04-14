import { Router, Request, Response, NextFunction } from 'express';
import {
  registrarJornada,
  salirJornada,
  obtenerJornadas,
} from '../controllers/jornadaController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// Middleware para manejar errores de funciones async
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/clock-in', asyncHandler(authenticateJWT), registrarJornada);
router.put('/clock-out', asyncHandler(authenticateJWT), salirJornada);
router.get('/', asyncHandler(authenticateJWT), obtenerJornadas);

export default router;
