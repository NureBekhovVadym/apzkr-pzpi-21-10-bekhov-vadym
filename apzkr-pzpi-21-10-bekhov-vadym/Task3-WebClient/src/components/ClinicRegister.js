import React, { useState } from 'react';
import axios from 'axios';
import styles from './ClinicRegister.module.css';

const ClinicRegister = ({ onClose }) => {
  const [clinicName, setClinicName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:8080/api/vetClinic/add', 
        { clinicName, email, phone, address, description },
        {
          headers: {
            Authorization: token
          }
        }
      );
      setSuccessMessage('Клініка успішно зареєстрована!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Помилка при реєстрації клініки:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Реєстрація клініки</h2>
        <input
          type="text"
          value={clinicName}
          onChange={(e) => setClinicName(e.target.value)}
          placeholder="Назва клініки"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Телефон"
          required
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Адреса"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Опис"
          required
        />
        <button type="submit">Зареєструвати</button>
        <button type="button" onClick={onClose}>Закрити</button>
      </form>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
    </div>
  );
};

export default ClinicRegister;
