import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (min-width: 750px) {
    flex-direction: row;
  }
`;

const InputLabel = styled.label`
  font-weight: bold;
  font-size: 0.9em;
  margin-bottom: 5px;
  @media (min-width: 750px) {
    margin-right: 25px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 10px 5px;
  font-family: 'Roboto';
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #dbdbdb;
`;

const TextInput = ({value, handleChange, label}) => {
  return(
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <Input type='text' value={value} onChange={({target})=>handleChange(target.value)}></Input>
    </InputContainer>
  )
};

export default TextInput;
