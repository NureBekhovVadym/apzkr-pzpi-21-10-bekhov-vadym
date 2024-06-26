import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ClinicAppointments.module.css';

const ClinicAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [clinicId, setClinicId] = useState(null);

  useEffect(() => {
    fetchClinicId();
  }, []);

  useEffect(() => {
    if (clinicId) {
      fetchAppointments();
    }
  }, [clinicId]);

  const fetchClinicId = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Токен не знайдено');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/api/vetClinic/view', {
        headers: {
          Authorization: token,
        },
      });
      if (response.data && response.data.length > 0) {
        setClinicId(response.data[0]._id);
      } else {
        setError('Ви не маєте зареєстрованої клініки');
      }
    } catch (error) {
      console.error('Помилка при отриманні інформації про клініку:', error);
      setError('Не вдалося отримати інформацію про клініку');
    }
  };

  const fetchAppointments = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Токен не знайдено');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/api/appointment/all', {
        headers: {
          Authorization: token,
        },
      });
      const filteredAppointments = response.data.filter(
        (appointment) => appointment.clinicId === clinicId
      );
      setAppointments(filteredAppointments);
    } catch (error) {
      console.error('Помилка при отриманні записів:', error);
      setError('Не вдалося отримати записи');
    }
  };

  return (
    <div className={styles.appointmentsContainer}>
      <h2>Записи до клініки</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.appointmentsGrid}>
        {appointments.map((appointment) => (
          <div key={appointment._id} className={styles.appointmentCard}>
            <h3>Користувач: {appointment.userId.name}</h3>
            <p>Email: {appointment.userId.email}</p>
            <p>Дата: {new Date(appointment.date).toLocaleDateString()}</p>
            <p>Час: {appointment.time}</p>
            <p>Опис: {appointment.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicAppointments;
