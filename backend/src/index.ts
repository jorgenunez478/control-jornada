import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool, connectMongo } from './config/db';

import authRoutes from './routes/authRoutes';
import jornadaRoutes from './routes/jornadaRoutes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API de control de jornada laboral');
});
app.use('/api/auth', authRoutes);
app.use('/api/jornada', jornadaRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await pool.connect();
    console.log('Conexión a PostgreSQL establecida correctamente');
    await connectMongo();
    console.log(`Servidor escuchando en puerto ${PORT}`);
  } catch (err) {
    console.error('Error de conexión', err);
  }
});
