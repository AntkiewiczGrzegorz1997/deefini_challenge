import React from 'react';

const InputBox = ({ type, label, placeholder, name, value, onChange }) => {
  return (
    <div className='inputbox-container'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
