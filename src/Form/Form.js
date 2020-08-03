import React, { useState } from 'react'
import './Form.css'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

function Form({ countries, submitCountry }) {
  const [selectedValue, setSelectedValue] = useState('') 
  console.log(selectedValue, 'thing being passed into undefined')
  let countryOptions;
  if (countries.length >= 1) {
    countryOptions = countries.map(country => {
    return (
        <option data-testid="select-option" key={country.key} value={country.value}>{country.value}</option>
      )
    })
  }
  

  return (
    <form className="country-form">
      <label className="input-title">Destination</label>
      <select 
        id="countries" 
        name="Countries" 
        className="countries"
        data-testid="select-box"
        onChange={(event) => setSelectedValue(event.target.value)}
      >
        <option value="Select">Select...</option>
          {countryOptions}
      </select>
      <Link to={`/countries/${selectedValue}/holidays`} style={{ textDecoration: 'none' }}>
        <button 
          type="submit" 
          name="submit-btn" 
          className="submit-btn"
          disabled={selectedValue.length < 1 && selectedValue !== 'Select...'}
          onClick={() => submitCountry(selectedValue)}
        >
          GO!
        </button>
      </Link>
    </form>
  )
}

export default Form

Form.propTypes = {
  countries: PropTypes.array,
  submitCountry: PropTypes.func
}
