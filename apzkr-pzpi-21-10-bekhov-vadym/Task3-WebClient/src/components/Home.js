import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import image1 from '../img/1.jpg';
import image2 from '../img/2.jpg';
import image3 from '../img/3.jpg';
import image4 from '../img/4.jpg';

const images = [image1, image2, image3, image4];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img
          src={images[currentImageIndex]}
          alt="Rotating"
          className={`${styles.image} ${fade ? styles.fadeIn : styles.fadeOut}`}
        />
      </div>
      <div className={styles.right}>
        <h2>Чому обрати наш нашийник?</h2>
        <p>
          Програмна система для відстеження життєвих показників тварин за допомогою розумних нашийників пропонує унікальні можливості:
        </p>
        <ul>
          <li>Моніторинг здоров'я вашого улюбленця в режимі реального часу.</li>
          <li>Сповіщення про будь-які відхилення у показниках.</li>
          <li>Відстеження активності та місцезнаходження.</li>
          <li>Легкий та зручний інтерфейс.</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
