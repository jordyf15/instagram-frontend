import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {deleteProfilePicture} from '../../redux/slices/userSlice'
import styled from 'styled-components';
import ImageInput from './ImageInput';

const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 250px;
  border-radius: 10px;
  @media (min-width: 750px) {
    width: 400px;
  }
`;

const Heading = styled.h3`
  margin: 25px 0;
  text-align: center;
`;

const RemovePicBtn = styled.button`
  background: none;
  border:none;
  font-size: 0.9em;
  border-top: 1px solid #dbdbdb;
  font-weight: bold;
  font-family: 'Roboto';
  color: #ed4956;
  padding: 15px 0;
`;

const CancelBtn = styled.button`
  background: none;
  border: none;
  font-family: 'Roboto';
  font-size: 0.9em;
  border-top: 1px solid #dbdbdb;
  padding: 15px 0;
`;

const ChangeProfilePicModal = ({handleChange, closeModal}) => {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user);
  const handleClick = (e) => {
    e.stopPropagation();
  };
  const handleDeleteProfilePicture = async() => {
    await dispatch(deleteProfilePicture(user.id))
    closeModal();
  }

  return (
    <Background onClick={closeModal}>
      <Container onClick={handleClick}>
        <Heading>Change Profile Photo</Heading>
        <ImageInput handleChange={handleChange}/>
        <RemovePicBtn onClick={handleDeleteProfilePicture}>Remove Current Photo</RemovePicBtn>
        <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
      </Container>
    </Background>
  )
};

export default ChangeProfilePicModal;
