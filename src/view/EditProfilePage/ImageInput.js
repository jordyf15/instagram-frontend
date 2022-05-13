import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const UpdatePhotoLabel = styled.label`
  color: #0095f6;
  font-weight: bold;
  font-family: 'Roboto';
  border-top: 1px solid #dbdbdb;
  font-size: 0.9em;
  padding: 15px 0;
  display: block;
  text-align: center;
`; 

const InputPhotoLabel = styled.label`
  font-weight: bold;
  font-size: 0.85em;
  color: #0095f6;
`;

const FileInput = styled.input`
  display: none;
`;

const ImageInput = ({handleChange}) => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      {
        user.profile_pictures
        ?<UpdatePhotoLabel htmlFor='image-input'>Upload Photo</UpdatePhotoLabel>
        :<InputPhotoLabel htmlFor='image-input'>Change Profile Photo</InputPhotoLabel>
      }
      <FileInput id='image-input' type='file' onChange={({target})=>handleChange(target.files[0])}/>
    </div>
  )
};

export default ImageInput;