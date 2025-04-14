import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { clockIn, clockOut, getTimeRecords } from '../../services/timeTracking';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TimeClock = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [todayRecord, setTodayRecord] = useState(null);

  useEffect(() => {
    const checkTodayStatus = async () => {
      try {
        const records = await getTimeRecords(token);
        const today = new Date().toISOString().split('T')[0];
        const todayRecord = records.find(r => r.fecha === today);
        
        if (todayRecord) {
          setTodayRecord(todayRecord);
          setCurrentStatus(todayRecord.horaSalida ? 'completed' : 'working');
        } else {
          setCurrentStatus('not-started');
        }
      } catch (error) {
        console.error('Error checking today status:', error);
      }
    };
    
    if (token) checkTodayStatus();
  }, [token]);

  const handleClockIn = async () => {
    setLoading(true);
    try {
      const result = await clockIn(token);
      setCurrentStatus('working');
      setTodayRecord(result);
      toast.success(`Entrada registrada a las ${result.horaEntrada}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al registrar entrada');
    } finally {
      setLoading(false);
    }
  };

  const handleClockOut = async () => {
    setLoading(true);
    try {
      const result = await clockOut(token);
      setCurrentStatus('completed');
      setTodayRecord(prev => ({ ...prev, horaSalida: result.horaSalida }));
      toast.success(`Salida registrada a las ${result.horaSalida}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al registrar salida');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="time-clock">
      <h2>Control de Jornada</h2>
      <div className="clock-status">
        {todayRecord && (
          <div className="today-record">
            <p>Fecha: {todayRecord.fecha}</p>
            <p>Entrada: {todayRecord.horaEntrada || 'No registrada'}</p>
            <p>Salida: {todayRecord.horaSalida || 'No registrada'}</p>
          </div>
        )}
      </div>
      <div className="clock-actions">
        <button
          onClick={handleClockIn}
          disabled={loading || currentStatus === 'working'}
          className={`clock-btn ${currentStatus === 'working' ? 'disabled' : ''}`}
        >
          Marcar Entrada
        </button>
        <button
          onClick={handleClockOut}
          disabled={loading || currentStatus !== 'working'}
          className={`clock-btn ${currentStatus !== 'working' ? 'disabled' : ''}`}
        >
          Marcar Salida
        </button>
      </div>
    </div>
  );
};

export default TimeClock;