import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getTimeRecords } from '../../services/timeTracking';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TimeRecords = () => {
  const { token } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await getTimeRecords(token);
        setRecords(data);
      } catch (error) {
        toast.error('Error al cargar registros');
        console.error('Error fetching time records:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, [token]);

  // Función para calcular horas trabajadas
  const calcularHorasTrabajadas = (horaEntrada, horaSalida) => {
    if (!horaEntrada || !horaSalida) return '-';
    
    const [entradaH, entradaM] = horaEntrada.split(':').map(Number);
    const [salidaH, salidaM] = horaSalida.split(':').map(Number);
    
    const minutosEntrada = entradaH * 60 + entradaM;
    const minutosSalida = salidaH * 60 + salidaM;
    
    const diferenciaMinutos = minutosSalida - minutosEntrada;
    
    const horas = Math.floor(diferenciaMinutos / 60);
    const minutos = diferenciaMinutos % 60;
    
    return `${horas}h ${minutos}m`;
  };

  return (
    <div className="time-records">
      <h2>Historial de Jornadas</h2>
      {loading ? (
        <p>Cargando registros...</p>
      ) : records.length === 0 ? (
        <p>No hay registros de jornada disponibles</p>
      ) : (
        <div className="table-responsive">
          <table className="records-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Hora de Entrada</th>
                <th>Hora de Salida</th>
                <th>Horas Trabajadas</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id}>
                  <td>{record.fecha}</td>
                  <td>{record.horaEntrada || '-'}</td>
                  <td>{record.horaSalida || '-'}</td>
                  <td>
                    {calcularHorasTrabajadas(record.horaEntrada, record.horaSalida)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TimeRecords;