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
  if(username) {
    bodyFormData.append('username', username);
  }
  if(fullname) {
    bodyFormData.append('full_name', fullname);
  }
  if(password) {
    bodyFormData.append('password', password);
  }
  if(profilePic) {
    bodyFormData.append('profile_picture', profilePic);
  }
  if(email) {
    bodyFormData.append('email', email);
  }
  return axios.put(`${BASE_URL}/${userId}`,bodyFormData, {headers: {
      ...authHeader(),
      'Content-Type': 'multipart/form-data'
  }}).then((response) => response.data);
}

const deleteProfilePicture = (userId) => {
  return axios.delete(`${BASE_URL}/${userId}`, {
    headers:{
      ...authHeader(),
    }
  }).then((response) => response.data);
}

const userService = {
  register,
  updateProfile,
  getProfile,
  deleteProfilePicture,
};
export default userService;
