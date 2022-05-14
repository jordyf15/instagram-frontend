import React from 'react';
import styled from 'styled-components';

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 3;
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

const EditBtn = styled(Button)`
  border-bottom: 1px solid #dbdbdb;
  border-top: 1px solid #dbdbdb;
`;

const DeleteBtn = styled(Button)`
  font-weight: bold;
  color: #ed4956;
`;


const PostOptionModal = ({closeModal, handleDelete, openEditModal}) => {
  const handleClickBackground = (e) => {
    e.stopPropagation();
    closeModal();
  };

  const handleClickContainer = (e) => {
    e.stopPropagation();
  };

  const handleClickEdit = () => {
    openEditModal();
    closeModal();
  }

  return(
    <Background onClick={handleClickBackground}>
      <Container onClick={handleClickContainer}>
        <DeleteBtn onClick={handleDelete}>Delete</DeleteBtn>
        <EditBtn onClick={handleClickEdit}>Edit</EditBtn>
        <Button onClick={closeModal}>Cancel</Button>
      </Container>
    </Background>
  )
};

export default PostOptionModal;
