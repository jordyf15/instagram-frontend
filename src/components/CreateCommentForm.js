import React, {useState} from 'react';
import TextInput from './TextInput';
import { useDispatch } from 'react-redux';
import { postComment } from '../redux/slices/commentSlice';

const CreateCommentForm = ({postId}) => {
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postComment({postId, comment}))
      .unwrap()
      .then();
  }

  return(
    <form onSubmit={handleSubmit}>
      <TextInput value={comment} handleChange={setComment} label="Comment" placeholder="Comment" error={commentError}/>
      <button type="submit">Submit</button>
    </form>
  )
};

export default CreateCommentForm;
