import { Router, Request, Response, NextFunction } from 'express';
import { login, register } from '../controllers/authController';

const router = Router();

// Middleware para manejar errores de funciones async
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/login', asyncHandler(login));
router.post('/register', asyncHandler(register));

export default router;