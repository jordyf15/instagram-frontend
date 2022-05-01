import React from 'react';
import styled from 'styled-components';
import profileTest from '../../assets/profile-test.jpg';

const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  position: relative;
`;

const TextareaHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const UserProfilePic = styled.img`
  border-radius: 50%;
  width: 35px;
  margin: 15px;
`;

const Username = styled.span`
  font-weight: bold;
`;

const TextareaCaption = styled.textarea`
  width: 100%;
  flex-grow: 1;
  padding: 0 15px 15px 15px;
  border:none;
  font-size: 1.2em;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  resize: none;
`;

const TextCount = styled.span`
  color: #d2c7ca;
  position: absolute;
  bottom: 15px;
  right: 15px;
  font-size: 0.8em;
`;

const CaptionInput = ({value, handleChange}) => {
  return(
    <TextareaContainer>
      <TextareaHeader>
        <UserProfilePic src={profileTest} alt='user-profile-pic'/>
        <Username>jordivh</Username>
      </TextareaHeader>
      <TextareaCaption onChange={({target}) => handleChange(target.value)} placeholder='Write a caption...'/>
      <TextCount>{value.length} / 2200</TextCount>
    </TextareaContainer>
  )
};

export default CaptionInput;
