import axios from 'axios';
const BASE_URL = 'http://localhost:8000/authentications';

const login = (username, password) => {
  return axios.post(BASE_URL, {
    username,
    password
  }).then((response) => {
    if (response.data.access_token) {
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  });
};

const authService = {
  login
};

export default authService;
