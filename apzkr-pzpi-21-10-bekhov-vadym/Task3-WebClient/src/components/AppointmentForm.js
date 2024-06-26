import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './AppointmentForm.module.css';

const AppointmentForm = () => {
  const { clinicId } = useParams();
  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(''); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Токен не знайдено');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/api/animals/all', {
        headers: {
          Authorization: token,
        },
      });
      setPets(response.data);
    } catch (error) {
      console.error('Помилка при отриманні тварин:', error);
      setError('Не вдалося отримати тварини');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token) {
      setError('Токен не знайдено');
      return;
    }

    const appointmentData = {
      userId,
      clinicId,
      animalId: selectedPetId,
      date,
      time,
      description,
    };

    try {
      await axios.post('http://localhost:8080/api/appointment/new', appointmentData, {
        headers: {
          Authorization: token,
        },
      });
      setMessage('Запис до клініки успішний'); 
      setTimeout(() => {
        setMessage(''); 
        navigate('/'); 
      }, 3000);
    } catch (error) {
      console.error('Помилка при створенні запису:', error);
      setError('Не вдалося створити запис');
    }
  };

  return (
    <div className={styles.appointmentFormContainer}>
      <h2>Запис до клініки</h2>
      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.success}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Виберіть тварину:
          <select value={selectedPetId} onChange={(e) => setSelectedPetId(e.target.value)} required>
            <option value="">Виберіть тварину</option>
            {pets.map((pet) => (
              <option key={pet._id} value={pet._id}>
                {pet.name} ({pet.species})
              </option>
            ))}
          </select>
        </label>
        <label>
          Дата:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>
          Час:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </label>
        <label>
          Опис:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <button type="submit">Записатися</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
