import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import MyPets from './components/MyPets';
import MyClinic from './components/MyClinic';
import ClinicAppointments from './components/ClinicAppointments';
import AppointmentForm from './components/AppointmentForm';
import AllOrders from './components/AllOrders'; 
import OrderForm from './components/OrderForm';
import AllClinics from './components/AllClinics';
import styles from './App.module.css';
import pawImage from './img/paw.png'; // Імпортуйте картинку

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (token) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole(null);
    navigate('/');
  };

  const handleOrderClick = () => {
    setIsOrderFormOpen(true);
  };

  const handleOrderFormClose = () => {
    setIsOrderFormOpen(false);
  };

  const renderButtons = () => {
    if (role === 'User') {
      return (
        <>
          <li>
            <button onClick={() => navigate('/my-pets')} className={styles.navButton}>Мої тварини</button>
          </li>
          <li>
            <button onClick={handleOrderClick} className={styles.navButton}>Замовити</button>
          </li>
          <li>
            <button onClick={() => navigate('/vetclinics')} className={styles.navButton}>Запис до клініки</button>
          </li>
        </>
      );
    } else if (role === 'Vet') {
      return (
        <>
          <li>
            <button onClick={() => navigate('/my-clinic')} className={styles.navButton}>Моя клініка</button>
          </li>
          <li>
            <button onClick={() => navigate('/clinic-appointments')} className={styles.navButton}>Записи</button>
          </li>
        </>
      );
    } else if (role === 'Admin') {
      return (
        <>
          <li>
            <button onClick={() => navigate('/all-orders')} className={styles.navButton}>Замовлення</button>
          </li>
        </>
      );
    }
    return null;
  };

  return (
    <div>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <img
            src={pawImage}
            alt="Home"
            className={styles.navImage}
            onClick={() => navigate('/')}
          />
        </div>
        <div className={styles.navRight}>
          <ul>
            {isLoggedIn ? (
              <>
                {renderButtons()}
                <li>
                  <button onClick={handleLogout} className={styles.navButton}>Вихід</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={() => navigate('/login')}>Логін</button>
                </li>
                <li>
                  <button onClick={() => navigate('/register')}>Реєстрація</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      {isOrderFormOpen && <OrderForm onClose={handleOrderFormClose} />}
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setRole={setRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/my-pets" element={<MyPets />} />
        <Route path="/my-clinic" element={<MyClinic />} />
        <Route path="/clinic-appointments" element={<ClinicAppointments />} />
        <Route path="/all-orders" element={<AllOrders />} /> 
        <Route path="/vetclinics" element={<AllClinics />} />
        <Route path="/appointment/:clinicId" element={<AppointmentForm />} />
      </Routes>
    </div>
  );
};

export default App;
