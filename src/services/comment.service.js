import axios from 'axios';
import authHeader from './auth-header';
const BASE_URL = 'http://localhost:8000/posts';

const getComments = (postId) => {
  return axios.get(`${BASE_URL}/${postId}/comments`, {
    headers: authHeader(),
  }).then((response) => response.data);
};

const postComment = ({postId, comment}) => {
  return axios.post(`${BASE_URL}/${postId}/comments`, {comment}, {
    headers: authHeader(),
  }).then((response) => response.data);
};

const updateComment = ({postId, commentId, comment}) => {
  return axios.put(`${BASE_URL}/${postId}/comments/${commentId}`, {
    comment
  }, {
    headers: authHeader(),
  }).then((response) => response.data);
};

const deleteComment = ({postId, commentId}) => {
  return axios.delete(`${BASE_URL}/${postId}/comments/${commentId}`, {
    headers: authHeader(),
  }).then((response) => response.data);
};

const commentService = {
  getComments,
  postComment,
  updateComment,
  deleteComment
}

export default commentService;
