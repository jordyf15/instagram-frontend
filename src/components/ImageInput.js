import React from 'react';

const ImageInput = ({value, handleChange, error, label}) => {
  return (
    <div>
      <label>{label}</label>
      <input type="file" onChange={({target}) => handleChange(target.files[0])}/>
      <p>{error}</p>
    </div>
  )
};

export default ImageInput;
