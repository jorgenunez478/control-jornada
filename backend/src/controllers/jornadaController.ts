import { Request, Response } from 'express';
import Jornada from '../models/Jornada';

export const registrarJornada = async (req: Request, res: Response) => {
  const { fecha, horaEntrada } = req.body;
  const userId = (req as any).user.userId;
  const jornada = await Jornada.create({ userId, fecha, horaEntrada });
  res.status(201).json(jornada);
};

export const salirJornada = async (req: Request, res: Response) => {
  const { fecha, horaSalida } = req.body;
  const userId = (req as any).user.userId;
  const jornada = await Jornada.findOneAndUpdate(
    { userId, fecha },
    { horaSalida },
    { new: true }
  );
  res.json(jornada);
};

export const obtenerJornadas = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const jornadas = await Jornada.find({ userId });
  res.json(jornadas);
};
