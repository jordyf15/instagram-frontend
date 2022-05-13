import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { postComment } from '../../redux/slices/postSlice';

const Form = styled.form`
  display: none;
  align-items: center;
  padding: 10px 10px 0 10px;
  border-top: 1px solid #f7f7f7;
  @media (min-width: 750px) {
    display: flex;
  }
`;

const Textarea = styled.textarea`
  flex-grow: 1;
  border: none;
  font-family: 'Roboto';
  font-size: 0.9em;
  padding-top: 10px;
  resize: none;
  &:focus{
    box-shadow: none;
    border: none;
    overflow: auto;
    outline: none;
  }
`;

const ActiveBtn = styled.button`
  border:none;
  background: none;
  font-family: 'Roboto';
  font-weight: bold;
  color: #0095f6;
`;

const DisabledBtn = styled.button`
  border:none;
  background: none;
  font-family: 'Roboto';
  font-weight: bold;
  color: #b3dffc;
`;

const PostCommentForm = ({postId}) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleChange = (newComment) => {
    setComment(newComment)
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await dispatch(postComment({postId, comment}))
    setComment('');
  };

  return(
    <Form onSubmit={handleSubmit}>
      <Textarea placeholder='Add a comment...' value={comment} onChange={({target})=>handleChange(target.value)}/>
      {comment?<ActiveBtn type='submit'>Post</ActiveBtn>
      :<DisabledBtn type='submit' disabled>Post</DisabledBtn>}
    </Form>
  )
};

export default PostCommentForm;
