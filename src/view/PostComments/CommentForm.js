import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { postComment } from '../../redux/slices/postSlice';

const Form = styled.form`
  display: flex;
  align-items: center;
  padding: 0 10px 0 10px;
  border-top: 1px solid #f7f7f7;
`;

const Textarea = styled.textarea`
  flex-grow: 1;
  border: none;
  font-family: 'Roboto';
  font-size: 0.9em;
  padding-top: 10px;
  resize: none;
  &:focus {
    box-shadow: none;
    border: none;
    overflow: auto;
    outline: none;
  }
`;

const SubmitBtn = styled.button`
  border:none;
  background: none;
  font-family: 'Roboto';
  font-weight: bold;
`;

const SubmitBtnActive = styled(SubmitBtn)`
  color: #0095f6;
`;

const SubmitBtnDisabled = styled(SubmitBtn)`
  color: #b3dffc;
`;

const CommentForm = ({inputRef, postId}) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const handleChange = (newComment) => {
    setComment(newComment);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postComment({postId, comment}))
    .unwrap()
    .then(() => {
      setComment('');
    })
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Textarea value={comment} onChange={({target})=>handleChange(target.value)} ref={inputRef} placeholder='Add a comment...'/>
      {comment
      ?<SubmitBtnActive type='submit'>Post</SubmitBtnActive>
      :<SubmitBtnDisabled type='submit' disabled>Post</SubmitBtnDisabled>}
    </Form>
  )
};

export default CommentForm;