import React, { useState } from 'react';
import InputBox from './InputBox';
import '../styles/Form.css';
import { subscribeToWeatherForecast } from '../apiService';
import { validateFormInput } from '../utils/dataValidation';

const Form = () => {
  const emptyForm = {
    name: '',
    email: '',
    days: '',
    lat: '',
    lon: '',
  };

  const [formInput, setFormInput] = useState(emptyForm);

  const regexPatterns = {
    // lat: /^-?0(\.\d{0,2})?$|^[1-9]\d*(\.\d{0,5})?$/,
    // lon: /^-?0(\.\d{0,2})?$|^[1-9]\d*(\.\d{0,5})?$/,
    lat: /^-?\d*\.?\d{0,5}$/,
    lon: /^-?\d*\.?\d{0,5}$/,
    days: /^0$|^[1-9]\d*$/,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (regexPatterns[name]) {
      const pattern = regexPatterns[name];

      if (pattern.test(value) || value === '') {
        setFormInput((prevFormInput) => ({ ...prevFormInput, [name]: value }));
      }
    } else {
      setFormInput((prevFormInput) => ({ ...prevFormInput, [name]: value }));
    }
  };

  const isSubmitDisabled =
    !formInput.name.trim() ||
    !formInput.email.trim() ||
    !formInput.days.trim() ||
    !formInput.lat.trim() ||
    !formInput.lon.trim();

  const handleSubmit = (e) => {
    e.preventDefault();

    //transform all numbers to desired format
    const processedFormInput = {
      ...formInput,
      lat: parseFloat(formInput.lat),
      lon: parseFloat(formInput.lon),
      days: parseInt(formInput.days, 10),
    };

    const validationMessages = validateFormInput(processedFormInput);

    if (validationMessages.length > 0) {
      alert(validationMessages.join('\n'));
      return;
    }

    subscribeToWeatherForecast(processedFormInput);
    setFormInput(emptyForm);
  };

  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <InputBox
        type='text'
        label='Name'
        placeholder='Enter your name'
        name='name'
        value={formInput.name}
        onChange={handleChange}
      />
      <InputBox
        type='text'
        label='Email'
        placeholder='Enter email'
        name='email'
        value={formInput.email}
        onChange={handleChange}
      />
      <InputBox
        type='text'
        label='Days'
        placeholder='Enter number of days you want to receive the forecast'
        name='days'
        value={formInput.days}
        onChange={handleChange}
      />
      <InputBox
        type='text'
        label='Latitude'
        placeholder='Enter forecast latitude'
        name='lat'
        value={formInput.lat}
        onChange={handleChange}
      />
      <InputBox
        type='text'
        label='Longitude'
        placeholder='Enter forecast longitude'
        name='lon'
        value={formInput.lon}
        onChange={handleChange}
      />

      <button
        className={`submit-button ${isSubmitDisabled ? 'disabled' : ''}`}
        type='submit'
        disabled={isSubmitDisabled}
      >
        Subscribe to forecast
      </button>
    </form>
  );
};

export default Form;
