import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AllClinics.module.css';

const AllClinics = () => {
  const [clinics, setClinics] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllClinics();
  }, []);

  const fetchAllClinics = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/vetClinic/all');
      console.log('Response data:', response.data);
      setClinics(response.data);
    } catch (error) {
      console.error('Помилка при отриманні інформації про клініки:', error);
      setError('Не вдалося отримати інформацію про клініки');
    }
  };

  const handleClinicClick = (clinicId) => {
    navigate(`/appointment/${clinicId}`);
  };

  return (
    <div className={styles.clinicContainer}>
      <h2>Всі клініки</h2>
      {error && <p className={styles.error}>{error}</p>}
      {clinics.length > 0 ? (
        clinics.map((clinic) => (
          <div
            key={clinic.id}
            className={styles.clinicInfo}
            onClick={() => handleClinicClick(clinic._id)}
          >
            <p><strong>Назва:</strong> {clinic.clinicName}</p>
            <p><strong>Email:</strong> {clinic.email}</p>
            <p><strong>Телефон:</strong> {clinic.phone}</p>
            <p><strong>Адреса:</strong> {clinic.address}</p>
            <p><strong>Опис:</strong> {clinic.description}</p>
          </div>
        ))
      ) : (
        <p>Немає доступних клінік.</p>
      )}
    </div>
  );
};

export default AllClinics;
