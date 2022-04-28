import React, { useState } from 'react';
import TextInput from './TextInput';
import { useDispatch } from 'react-redux';
import { updatePost } from '../redux/slices/post';

const EditPostForm = ({postId}) => {
  const [caption, setCaption] = useState('');
  const [captionError, setCaptionError] = useState('');
  const dispatch = useDispatch();

  const handleChangeCaption = (newCaption) => {
    setCaption(newCaption);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePost({postId, caption}))
    .unwrap()
    .then();
  } 

  return (
    <form onSubmit={handleSubmit}>
      <TextInput placeholder='Caption' value={caption} handleChange={handleChangeCaption} error={captionError} label='Caption'/>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default EditPostForm;
