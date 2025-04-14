import mongoose from 'mongoose';

const jornadaSchema = new mongoose.Schema({
  userId: { type: Number, required: true }, // ID de PostgreSQL
  fecha: { type: String, required: true },
  horaEntrada: { type: String, required: true },
  horaSalida: { type: String },
});

export default mongoose.model('Jornada', jornadaSchema);
