import React, { useState } from 'react';
import axios from 'axios';
import styles from './OrderForm.module.css';

const OrderForm = ({ onClose }) => {
  const [deviceQuantity, setDeviceQuantity] = useState('');
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      await axios.post(
        'http://localhost:8080/api/order/add', 
        { deviceQuantity, comment },
        {
          headers: {
            Authorization: `${token}`
          }
        }
      );
      setSuccessMessage('Замовлення успішно створено!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 3000); 
    } catch (error) {
      console.error('Помилка при створенні замовлення:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Замовити девайси</h2>
        <input
          type="number"
          value={deviceQuantity}
          onChange={(e) => setDeviceQuantity(e.target.value)}
          placeholder="Кількість девайсів"
          required
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Коментар"
        />
        <button type="submit">Замовити</button>
        <button type="button" onClick={onClose}>Закрити</button>
      </form>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
    </div>
  );
};

export default OrderForm;
