import React from 'react';

const TextInput = ({placeholder, value, handleChange, error, label}) => {
  return (
    <div>
      <label>{label}</label>
      <input type="text" onChange={({target})=>handleChange(target.value)} placeholder={placeholder} value={value}/>
      <p>{error}</p>
    </div>
  )
};

export default TextInput;