import axios from 'axios';
import authHeader from './auth-header';
const BASE_URL = 'http://localhost:8000/posts';

const getPosts = () => {
  return axios.get(BASE_URL, {
    headers: authHeader(),
  }).then((response) => response.data);
};

const createPost = ({visualMedias, caption}) => {
  const bodyFormData = new FormData();
  bodyFormData.append('caption', caption);
  visualMedias.forEach((visualMedia) => {
    bodyFormData.append('visual_medias', visualMedia);
  });
  return axios.post(BASE_URL, bodyFormData, {headers: {
    ...authHeader(),
    'Content-Type': 'multipart/form-data'
  }}).then((response) => response.data);
};

const getUserPosts = () => {
  return axios.get(`${BASE_URL}/me`,{
    headers: authHeader(),
  }).then((response) => response.data);
};

const updatePost = ({postId, caption}) => {
  return axios.put(`${BASE_URL}/${postId}`, {caption}, {
    headers: authHeader(),
  }).then((response) => response.data);
};

const deletePost = (postId) => {
  return axios.delete(`${BASE_URL}/${postId}`, {
    headers: authHeader(),
  }).then((response) => response.data);
}

const postService = {
  getPosts,
  createPost,
  getUserPosts,
  updatePost,
  deletePost,
}

export default postService;
