import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MyClinic.module.css';
import ClinicRegister from './ClinicRegister';

const MyClinic = () => {
  const [clinic, setClinic] = useState(null);
  const [error, setError] = useState('');
  const [isRegisterFormOpen, setIsRegisterFormOpen] = useState(false);
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchClinicInfo();
  }, []);

  const fetchClinicInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Токен не знайдено');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/api/vetClinic/view', {
        headers: {
          Authorization: `${token}`
        }
      });
      console.log('Response data:', response.data);
      if (response.data && response.data.length > 0) {
        setClinic(response.data[0]);
      } else {
        setClinic(null);
      }
    } catch (error) {
      console.error('Помилка при отриманні інформації про клініку:', error);
      setError('Не вдалося отримати інформацію про клініку');
    }
  };

  const handleRegisterClinic = () => {
    setIsRegisterFormOpen(true);
  };

  const handleFormClose = () => {
    setIsRegisterFormOpen(false);
  };

  return (
    <div className={styles.clinicContainer}>
      <h2>Моя клініка</h2>
      {error && <p className={styles.error}>{error}</p>}
      {clinic ? (
        <div className={styles.clinicInfo}>
          <p><strong>Назва:</strong> {clinic.clinicName}</p>
          <p><strong>Email:</strong> {clinic.email}</p>
          <p><strong>Телефон:</strong> {clinic.phone}</p>
          <p><strong>Адреса:</strong> {clinic.address}</p>
          <p><strong>Опис:</strong> {clinic.description}</p>
        </div>
      ) : (
        role === 'Vet' && (
          <>
            <button onClick={handleRegisterClinic} className={styles.registerButton}>
              Зареєструвати клініку
            </button>
            {isRegisterFormOpen && <ClinicRegister onClose={handleFormClose} />}
          </>
        )
      )}
    </div>
  );
};

export default MyClinic;
