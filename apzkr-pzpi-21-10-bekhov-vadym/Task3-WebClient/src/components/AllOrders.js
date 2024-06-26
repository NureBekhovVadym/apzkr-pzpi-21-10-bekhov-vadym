import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AllOrders.module.css';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Токен не знайдено');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8080/api/order/all', {
        headers: {
          Authorization: token,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Помилка при отриманні замовлень:', error);
      setError('Не вдалося отримати замовлення');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Токен не знайдено');
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/order/${orderId}`, {
        headers: {
          Authorization: token,
        },
      });
      fetchOrders();
    } catch (error) {
      console.error('Помилка при видаленні замовлення:', error);
      setError('Не вдалося видалити замовлення');
    }
  };

  return (
    <div className={styles.ordersContainer}>
      <h2>Всі замовлення</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.ordersGrid}>
        {orders.map((order) => (
          <div key={order._id} className={styles.orderCard}>
            <h3>Користувач: {order.userId.name}</h3>
            <p>Email: {order.userId.email}</p>
            <p>Кількість пристроїв: {order.deviceQuantity}</p>
            <p>Загальна вартість: {order.totalPrice} грн</p>
            <p>Дата: {new Date(order.date).toLocaleDateString()}</p>
            {order.comment && <p>Коментар: {order.comment}</p>}
            <button onClick={() => handleDeleteOrder(order._id)} className={styles.deleteButton}>
              Видалити запис
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
