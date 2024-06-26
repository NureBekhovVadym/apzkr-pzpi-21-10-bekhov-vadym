import React, { useState } from 'react';
import axios from 'axios';
import styles from './AddPetForm.module.css';

const AddPetForm = ({ onClose, updatePets }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const userId = JSON.parse(atob(token.split('.')[1])).id;

    try {
      await axios.post('http://localhost:8080/api/animals/add', { name, species, userId }, {
        headers: {
          Authorization: token
        }
      });
      // Оновлюємо список тварин після додавання
      updatePets();
      onClose();
    } catch (error) {
      console.error('Помилка при додаванні тварини:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Додати тварину</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ім'я"
          required
        />
        <input
          type="text"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          placeholder="Вид"
          required
        />
        <button type="submit">Додати</button>
        <button type="button" onClick={onClose}>Закрити</button>
      </form>
    </div>
  );
};

export default AddPetForm;
