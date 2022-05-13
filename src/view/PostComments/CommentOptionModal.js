import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { deleteComment } from '../../redux/slices/postSlice';

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
`;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 250px;
  border-radius: 15px;
  @media (min-width: 750px) {
    max-width: 400px;
  }
`;

const Button = styled.button`
background: none;
border:none;
font-family: 'Roboto';
padding: 15px 0;
font-size: 0.9em;
`;

const DeleteBtn = styled(Button)`
  font-weight: bold;
  color: #ed4956;
  border-bottom: 1px solid #dbdbdb;
`;

const CommentOptionModal = ({comment, closeModal}) => {
  const dispatch = useDispatch();
  const handleDeleteComment = async () => {
    await dispatch(deleteComment({commentId: comment.id, postId: comment.post_id}));
    closeModal();
  };

  const handleClickModal = (e) => {
    e.stopPropagation();
  };

  const handleClickBackground = (e) => {
    e.stopPropagation();
    closeModal();
  };
  
  return (
    <Background onClick={handleClickBackground}>
      <Container onClick={handleClickModal}>
        <DeleteBtn onClick={handleDeleteComment}>Delete</DeleteBtn>
        <Button onClick={closeModal}>Cancel</Button>
      </Container>
    </Background>
  )
};

export default CommentOptionModal;
