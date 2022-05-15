import axios from 'axios';
const BASE_URL = 'http://localhost:8000/authentications';

const login = (username, password) => {
  return axios.post(BASE_URL, {
    username,
    password
  }).then((response) => {
    return response.data;
  });
};

const authService = {
  login
};

export default authService;
