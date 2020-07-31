import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import './App.css';
import calendar from '../Assets/calendar-icon.svg'
import Holidays from '../Holidays/Holidays'
import Saved from '../Saved/Saved'
import Form from '../Form/Form'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [countries, setCountries] = useState([])
  const [error, setError] = useState(false)
  const [isSelected, setIsSelected] = useState({})

  const submitCountry = (value) => {
    const countrySelected = countries.find(country => country.value === value)
    setIsSelected(countrySelected)
    console.log(countrySelected, 'selection in submit country in app')
  }

  const getCountries = () => {
    fetch('https://fe-cors-proxy.herokuapp.com/', {
      headers: {
        'Target-URL': 'http://date.nager.at/Api/v2/AvailableCountries'
      }
    })
      .then((res) => res.json())
      .then((res) => setCountries(res))
      .catch((err) => {
        setIsLoading(false)
        setError(true)
        console.log(err)
      })

    // fetch('http://cors-anywhere.herokuapp.com/http://date.nager.at/Api/v2/AvailableCountries')
    //   .then((res) => res.json())
    //   .then((res) => setCountries(res))
    //   .catch((err) => {
    //     setIsLoading(false)
    //     setIsError(true)
    //     console.log(err)
    //   })
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
            // onClick={} 
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
      {/* dynamic path /countries/:countryCode/holidays */}
      <Route path="/holidays" render={() => <Holidays isSelected={isSelected} />} />
      <Route path="/saved" render={() => <Saved />} />
      <Route path="/" render={() => main} />
    </Switch>
  )
}

export default App
