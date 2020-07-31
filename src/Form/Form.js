import React from 'react'
import './Form.css'
import { Link } from 'react-router-dom'

function Form({ countries, submitCountry }) {
  const countryOptions = countries.map(country => {
  return (
      <option key={country.key} value={country.value}>{country.value}</option>
    )
  })
  
  const selectedValue = document.getElementById('countries')

  return (
    <form className="country-form">
      <label className="input-title">Destination</label>
      <select id="countries" name="Countries" className="countries">
        <option value="choose">Select...</option>
          {countryOptions}
      </select>
      <Link to="/holidays" style={{ textDecoration: 'none' }}>
        <button 
          type="submit" 
          name="submit-btn" 
          className="submit-btn"
          onClick={() => submitCountry(selectedValue.value)}
        >
          GO!
        </button>
      </Link>
    </form>
  )
}

export default Form