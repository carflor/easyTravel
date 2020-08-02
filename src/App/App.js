import React, { useState, useEffect } from 'react';
import './App.css';
import calendar from '../Assets/calendar-icon.svg'
import Holidays from '../Holidays/Holidays'
import Saved from '../Saved/Saved'
import Form from '../Form/Form'
import { Route, Switch, Link } from 'react-router-dom'
import { fetchCountries } from '../apiCalls'

function App() {

  // set holiday id on fetch  
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

  // const eraseDate = (event) => {
  //   if (event.target.parentElement.classList[0] === 'attend-card') {
  //     // below is the country that matches 
  //     console.log('should match clicked country',event.target.parentElement.childNodes[0].innerText)
  //     const clickedCountry = event.target.parentElement.childNodes[0].innerText
  //     console.log(clickedCountry, 'clickedCountry var ')
  //     // below is the the date to match both
  //     console.log('should match clicked date',event.target.parentElement.childNodes[1].innerText)
  //     const clickedDate = event.target.parentElement.childNodes[1].innerText
  //     console.log(clickedDate, 'clicked date here')
  //     const foundAvoid = avoidArr.find(holiday => {
  //       if(holiday.name === clickedDate && holiday.country === clickedCountry) { return holiday }
  //     })
  //     console.log(foundAvoid, 'should be one in avoid arr')
  //     const foundAttend = attendArr.find(holiday => holiday.name === clickedDate && holiday.country === clickedCountry)
  //     console.log(foundAttend, 'should be one in attend arr')
  //     if (foundAttend) {
  //       const match = attendArr.find(day => day === foundAttend)
  //       const index = attendArr.indexOf(match)
  //       const copyArr = [...attendArr]
  //       const removeItem = copyArr.splice(index, 1)
  //       setAttendArr(copyArr)
  //     }

  //     if (foundAvoid) {
  //       const match = avoidArr.find(day => day === foundAvoid)
  //       const index = avoidArr.indexOf(match)
  //       const copyArr = [...avoidArr]
  //       const removeItem = copyArr.splice(index, 1)
  //       setAvoidArr(copyArr)

  //     }
  //     // const match = attendArr.find(day => day === holiday)
  //     // const index = attendArr.indexOf(match)
  //     // const copyArr = [...attendArr]
  //     // const removeItem = copyArr.splice(index, 1)
  //     // setAttendArr(copyArr)
  //   } else {
  //     // avoid section
  //   }
  // }

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
      {/* dynamic path /countries/:countryCode/holidays */}
      <Route 
        path="/countries/:countryCode/holidays" 
        render={() => <Holidays 
          isSelected={isSelected} 
          avoidArr={avoidArr} 
          setAvoidArr={setAvoidArr} 
          attendArr={attendArr} 
          setAttendArr={setAttendArr}
        />} 
      />
      <Route 
        path="/saved" 
        render={() => <Saved 
          avoidArr={avoidArr} 
          attendArr={attendArr} 
          setAttendArr={setAttendArr}
          setAvoidArr={setAvoidArr}
          // eraseDate={eraseDate} 
        />} 
      />
      <Route path="/" render={() => main} />
    </Switch>
  )
}

export default App
