import React from 'react';
import styled from 'styled-components';

const Textarea = styled.textarea`
  width: 100%;
  border: none;
  min-height: 150px;
  padding: 5px 20px;
  font-size: 1.2em;
  font-size: 'Roboto';
  resize: none;
`;

const TextArea = ({value, handleChange}) => {
  return(
    <Textarea value={value} onChange={({target})=>handleChange(target.value)}/>
  )
};

export default TextArea;
