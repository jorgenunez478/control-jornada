import axios from 'axios';

const API_URL = 'http://localhost:5000/api/jornada';

const getAuthHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const clockIn = async (token) => {
  const now = new Date();
  const fecha = now.toISOString().split('T')[0];
  const horas = String(now.getHours()).padStart(2, '0');
  const minutos = String(now.getMinutes()).padStart(2, '0');
  const horaEntrada = `${horas}:${minutos}`;

  const response = await axios.post(
    `${API_URL}/clock-in`,
    {
      fecha,
      horaEntrada
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
};

export const clockOut = async (token) => {
  const now = new Date();
  const fecha = now.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  const horas = String(now.getHours()).padStart(2, '0');
  const minutos = String(now.getMinutes()).padStart(2, '0');
  const horaSalida = `${horas}:${minutos}`;

  const response = await axios.put(
    `${API_URL}/clock-out`,
    {
      fecha,
      horaSalida
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
};

export const getTimeRecords = async (token) => {
  const response = await axios.get(`${API_URL}/`, getAuthHeader(token));
  return response.data;
};