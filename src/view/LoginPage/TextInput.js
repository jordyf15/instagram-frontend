import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  position: relative;
`;

const InputFilledLabel = styled.label`
  position: absolute;
  color: #8e8e8e;
  left: 10px;
  top: 5px;
  font-size: 0.6em;
`;

const InputEmptyLabel = styled.label`
  position: absolute;
  color: #8e8e8e;
  font-size: 0.78em;
  top: 10px;
  left: 10px;
`;

const InputBox = styled.input`
  border: 1px solid #dbdbdb;
  width: 100%;
  font-size: 0.75em;
  padding: 15px 0px 5px 9px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const TextInput = ({value, handleChange, error, label}) => {
  return (
    <InputContainer>
      {value?<InputFilledLabel>{label}</InputFilledLabel>
      :<InputEmptyLabel>{label}</InputEmptyLabel>}
      <InputBox type="text" onChange={({target})=>handleChange(target.value)} value={value}/>
    </InputContainer>
  )
};

export default TextInput;