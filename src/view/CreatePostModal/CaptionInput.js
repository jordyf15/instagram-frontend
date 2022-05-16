import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { DEFAULT_PROFILE_PICTURE_LINK, requestImageUrl } from '../../utils/imageRequest';

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
  const user = useSelector((state)=>state.user);
  return(
    <TextareaContainer>
      <TextareaHeader>
        {
          user.profile_pictures
          ?<UserProfilePic src={requestImageUrl(user.profile_pictures[0].url)} alt='user-profile-pic'/>
          :<UserProfilePic src={requestImageUrl(DEFAULT_PROFILE_PICTURE_LINK)} alt='user-profile-pic'/>
        }
        <Username>{user.username}</Username>
      </TextareaHeader>
      <TextareaCaption onChange={({target}) => handleChange(target.value)} placeholder='Write a caption...'/>
      <TextCount>{value.length} / 2200</TextCount>
    </TextareaContainer>
  )
};

export default CaptionInput;
