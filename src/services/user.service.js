import axios from 'axios';
import authHeader from './auth-header';
const BASE_URL = 'http://localhost:8000/users';

const register = ({ email, username, fullname, password }) => {
  return axios.post(BASE_URL, {
    email,
    username,
    fullname,
    password
  }).then((response) => response.data);
};

const getProfile = (userId) => {
  return axios.get(`${BASE_URL}/${userId}`, {
    headers: authHeader(),
  }).then((response) => response.data);
}

const updateProfile = ({username, fullname, password, email, profilePic, userId}) => {
  const bodyFormData = new FormData();
  bodyFormData.append('username', username);
  bodyFormData.append('full_name', fullname);
  bodyFormData.append('password', password);
  bodyFormData.append('profile_picture', profilePic);
  bodyFormData.append('email', email);
  return axios.put(`${BASE_URL}/${userId}`,bodyFormData, {headers: {
      ...authHeader(),
      'Content-Type': 'multipart/form-data'
  }}).then((response) => response.data);
}

const userService = {
  register,
  updateProfile,
  getProfile,
};
export default userService;
