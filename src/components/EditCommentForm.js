import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateComment } from '../redux/slices/commentSlice';
import TextInput from './TextInput';

const EditCommentForm = ({postId, commentId}) => {
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateComment({postId, commentId, comment}))
      .unwrap()
      .then();
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextInput value={comment} placeholder='New Comment' label="Comment" handleChange={setComment}/>
      <button type='submit'>Edit</button>
    </form>
  )
};

export default EditCommentForm;
