import React, { useState, useEffect } from 'react'
import './Holidays.css'
import HolidayCard from '../HolidayCard/HolidayCard'
import { Link } from 'react-router-dom'
import { fetchHolidays } from '../apiCalls.js'
// const { uuid } = require('uuidv4');

function Holidays({ isSelected }) {
  const [holidays, setHolidays] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // const getHolidays = async () => {
    // await fetch('https://fe-cors-proxy.herokuapp.com/', {
    //   headers: {
    //     'Target-URL': `https://date.nager.at/Api/v2/NextPublicHolidays/${isSelected.key}`
    //   }
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     setHolidays(res)
    //     setIsLoading(false)
    //   })
    //   .catch((err) => {
    //     setIsLoading(false)
    //     setError(true)
    //     console.log(err)
    //   })
    // return { holidays, isLoading, error}
  // }
  const getHolidays = () => {
    fetchHolidays(isSelected.key)
      .then((res) => {
        setHolidays(res)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(true)
        console.log(err)
      })
    return { holidays, isLoading, error}
  }

  useEffect(() => {
    getHolidays()
  }, [])

  const yearlyHolidays = () => {
    const id = 1;
    return holidays.map(holiday => {
      console.log(holiday, 'holiday in MAP')
      return (
       <HolidayCard key={id++} holiday={holiday} />
      )
    })
  }

  return (
    <section className="holidays-page">
      <section className="title-box">
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1 className="title-container">Holidays</h1>
        </Link>
        <h1 className="country-name-container">{isSelected.value}</h1>
      </section>
      <section className="holidays-container">
        {isLoading && <h1 className="loading">Loading Holidays...</h1>}
        {!isLoading && yearlyHolidays()}
      </section>
    </section>
  )
}

export default Holidays