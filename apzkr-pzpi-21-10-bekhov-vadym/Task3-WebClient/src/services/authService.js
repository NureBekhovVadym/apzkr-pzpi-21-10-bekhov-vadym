import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

const login = (email, password) => {
  return axios
    .post(API_URL + 'login', { email, password })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const register = (name, surname, email, password, role) => {
  return axios.post(API_URL + 'registration', {
    name,
    surname,
    email,
    password,
    role,
  });
};

const authService = {
  login,
  register,
};

export default authService;
