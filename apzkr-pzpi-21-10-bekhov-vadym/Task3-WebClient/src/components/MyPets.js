import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MyPets.module.css';
import AddPetForm from './AddPetForm';

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const [error, setError] = useState('');
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

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
          Authorization: token
        }
      });
      const formattedPets = response.data.map(pet => ({
        name: pet.name,
        species: pet.species
      }));
      setPets(formattedPets);
    } catch (error) {
      console.error('Помилка при отриманні тварин:', error);
      setError('Не вдалося отримати тварини');
    }
  };

  const handleAddPetClick = () => {
    setIsAddFormOpen(true);
  };

  const handleFormClose = () => {
    setIsAddFormOpen(false);
  };

  const updatePets = () => {
    fetchPets();
  };

  return (
    <div className={styles.petsContainer}>
      <h2>Мої тварини</h2>
      {error && <p className={styles.error}>{error}</p>}
      <button onClick={handleAddPetClick} className={styles.addButton}>Додати тварину</button>
      {isAddFormOpen && <AddPetForm onClose={handleFormClose} updatePets={updatePets} />}
      <div className={styles.petsGrid}>
        {pets.map((pet, index) => (
          <div key={index} className={styles.petCard}>
            <h3>{pet.name}</h3>
            <p>Вид: {pet.species}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPets;
