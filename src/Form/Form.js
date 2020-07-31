import React, { useState } from 'react'
import './Form.css'
import { Link } from 'react-router-dom'

function Form({ countries, submitCountry }) {
  const [selectedValue, setSelectedValue] = useState('') 
  const countryOptions = countries.map(country => {
  return (
      <option key={country.key} value={country.value}>{country.value}</option>
    )
  })
  

  return (
    <form className="country-form">
      <label className="input-title">Destination</label>
      <select 
        id="countries" 
        name="Countries" 
        className="countries"
        onChange={(event) => setSelectedValue(event.target.value)}
      >
        <option value="choose">Select...</option>
          {countryOptions}
      </select>
      <Link to="/holidays" style={{ textDecoration: 'none' }}>
        <button 
          type="submit" 
          name="submit-btn" 
          className="submit-btn"
          onClick={() => submitCountry(selectedValue)}
        >
          GO!
        </button>
      </Link>
    </form>
  )
}

export default Form