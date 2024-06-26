import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Form.module.css';

const Login = ({ setIsLoggedIn, setRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      const decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));
      localStorage.setItem('role', decodedToken.role);
      setIsLoggedIn(true);
      setRole(decodedToken.role); // Оновлюємо роль в стані
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Логін</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Вхід</button>
    </form>
  );
};

export default Login;
