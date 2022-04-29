import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 5px;
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

const PasswordVisibilityBtn = styled.button`
  position: absolute;
  right: 5px;
  background: none;
  border: none;
  font-weight: bold;
  top: 8px;
  font-family: 'Roboto';
`;

const PasswordInput = ({value, handleChange, error, label}) => {
  const [show, setShow] = useState(false);

  const handleToggleShow = () => {
    setShow(!show);
  }

  return(
    <InputContainer>
      {value?<InputFilledLabel>{label}</InputFilledLabel>
      :<InputEmptyLabel>{label}</InputEmptyLabel>}
      <InputBox type={show?'text':'password'} onChange={({target})=>handleChange(target.value)} value={value}/>
      {value
      ?<PasswordVisibilityBtn type='button' onClick={handleToggleShow}>{show?'Hide':'Show'}</PasswordVisibilityBtn>
      :null
      }
    </InputContainer>
  )
}

export default PasswordInput;
