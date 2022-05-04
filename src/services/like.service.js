import axios from 'axios';
import authHeader from './auth-header';
const BASE_URL = 'http://localhost:8000/posts';

const likePost = (postId) => {
  return axios.post(`${BASE_URL}/${postId}/likes`, {}, {
    headers: authHeader(),
  }).then((response) => response);
};

const deletePostLike = ({postId, likeId}) => {
  return axios.delete(`${BASE_URL}/${postId}/likes/${likeId}`, {
    headers: authHeader(),
  }).then((response) => response);
};

const likeComment = ({postId, commentId}) => {
  return axios.post(`${BASE_URL}/${postId}/comments/${commentId}/likes`,{}, {
    headers: authHeader(),
  }).then((response) => response.data);
};

const deleteCommentLike = ({postId, commentId, likeId}) => {
  return axios.delete(`${BASE_URL}/${postId}/comments/${commentId}/likes/${likeId}`, {
    headers: authHeader(),
  }).then((response) => response.data);
};

const likeService = {
  likePost,
  deletePostLike,
  likeComment,
  deleteCommentLike
};

export default likeService;
