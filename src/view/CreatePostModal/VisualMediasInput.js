import React from 'react';
import styled from 'styled-components';
import visualMediaIcon from '../../assets/visual-media-icon.png';

const InputContainer = styled.div`
  flex-grow: 1;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputInfo = styled.p`
  font-size: 1.3em;
  color: #737373;
`;

const VisualMediasInputLabel = styled.label`
  background-color: #0095f6;
  color: white;
  font-size: 0.87em;
  font-weight: bold;
  padding: 10px;
  border-radius: 5px;
`;

const Input = styled.input`
  height: 100%;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
`;

const VisualMediasInput = ({handleChange}) => {
  return(
    <InputContainer>
      <img src={visualMediaIcon} alt=''/>
      <InputInfo>Drag photos and videos here</InputInfo>
      <VisualMediasInputLabel htmlFor='visual-medias-input'>Select from computer</VisualMediasInputLabel>
      <Input id='visual-medias-input' type='file' multiple onChange={({target}) => handleChange(target.files)}/>
    </InputContainer>
  )
};

export default VisualMediasInput;
