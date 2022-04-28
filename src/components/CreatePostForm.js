import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextInput from './TextInput';
import ImageInput from './ImageInput';
import { createPost } from '../redux/slices/post';

const CreatePostForm = () => {
  const [visualMedias, setVisualMedias] = useState([]);
  const [caption, setCaption] = useState('');
  const [visualMediasError, setVisualMediasError] = useState('');
  const [captionError, setCaptionError] = useState('');
  const dispatch = useDispatch();

  const handleChangeCaption = (newCaption) => {
    setCaption(newCaption);
  }

  const handleChangeVisualMedias = (newVisualMedia) => {
    setVisualMedias(visualMedias.concat([newVisualMedia]));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(visualMedias);
    dispatch(createPost({visualMedias, caption}))
      .unwrap()
      .then(()=>{

      }).catch((err) => {

      });
  }
  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="Caption" error={captionError} placeholder="Caption" handleChange={handleChangeCaption} value={caption}/>
      <ImageInput handleChange={handleChangeVisualMedias} error={visualMediasError} label='Visual Media'/>
      <button type='submit'>Submit</button>
    </form>
  )
};

export default CreatePostForm;
