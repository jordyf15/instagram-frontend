import React from 'react';

const PasswordInput = ({placeholder, value, handleChange, error, label}) => {

  return(
    <div>
      <label>{label}</label>
      <input type="password" onChange={({target})=>handleChange(target.value)} value={value} placeholder={placeholder}/>
      <p>{error}</p>
    </div>
  )
}

export default PasswordInput;
