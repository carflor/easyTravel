import React, { useState, useEffect } from 'react';
import './App.css';
import calendar from '../Assets/calendar-icon.svg'
import Holidays from '../Holidays/Holidays'
import Saved from '../Saved/Saved'
import Form from '../Form/Form'
import { Route, Switch, Link } from 'react-router-dom'
import { fetchCountries, fetchHolidays } from '../apiCalls'

function App() {  
  const [isLoading, setIsLoading] = useState(true)
  const [countries, setCountries] = useState([])
  const [error, setError] = useState(false)
  const [isSelected, setIsSelected] = useState({})
  const [avoidArr, setAvoidArr] = useState([])
  const [attendArr, setAttendArr] = useState([])

  const submitCountry = (value) => {
    const countrySelected = countries.find(country => country.value === value)
    setIsSelected(countrySelected)
    console.log(countrySelected, 'selection in submit country in app')
  }

  const getCountries = () => {
    fetchCountries()
      .then((res) => setCountries(res))
      .catch((err) => {
        setIsLoading(false)
        setError(true)
        console.log(err)
      })
    return { countries, isLoading, error }
  }

  useEffect(() => {
    getCountries()
  }, [])

  const main = (
    <main className="app">
      <nav className="nav">
        <p className="page-title">EasyTravel</p>
      </nav>
      <section className="country-container">
        <Link to="/saved" style={{ textDecoration: 'none' }}>
          <img
            alt="calendar icon"
            src={ calendar }
            className="calendar-icon"
          /> 
        </Link>
        <section className="search-box">
          <Form 
            countries={countries} 
            submitCountry={submitCountry} 
          />
        </section>
      </section>
    </main> 
  )
 
  return (
    <Switch>
      <Route 
        path='/countries/:countryCode/holidays'
        render={() => {
          return <Holidays 
            countryCode={isSelected.key}
            isSelected={isSelected} 
            avoidArr={avoidArr} 
            setAvoidArr={setAvoidArr} 
            attendArr={attendArr} 
            setAttendArr={setAttendArr}
          />}} 
      />
      <Route 
        path="/saved" 
        render={() => <Saved 
          avoidArr={avoidArr} 
          attendArr={attendArr} 
          setAttendArr={setAttendArr}
          setAvoidArr={setAvoidArr}
        />} 
      />
      <Route path="/" render={() => main} />
    </Switch>
  )
}

export default App
