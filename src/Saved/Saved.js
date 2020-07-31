import React, { useState, useEffect } from 'react'
import './Saved.css'
import { Link } from 'react-router-dom'

function Saved() {
  const [avoid, setAvoid] = useState([])
  const [attend, setAttend] = useState([])

  // const holidaysByType = (holidayArr) => {
  //   return holidayArr.map(holiday => {
  //     console.log(holiday, 'holiday in MAP')
  //     return (
  //       <section className="attend-card">
  //         <p>data 1 COUNTRY</p>
  //         <p>data 2 NAME HOLIDAY</p>
  //         <p>data 3 DATE</p>
  //       </section>
  //     )
  //   })
  // }

  return (
    <section className="saved-page">
      <section className="attend-container">
        <h2 className="attend-title">Attend</h2>
        <section className="attend-cards-container">
          <section className="attend-card">
            <p className="country-name-card">Albania</p>
            <p className="date-card">2021/03/04</p>
            <p className="holiday-name-card">Day of the Rabbit</p>
          </section>
          <section className="attend-card">
            <p className="country-name-card">Albania</p>
            <p className="date-card">2021/03/04</p>
            <p className="holiday-name-card">Day of the Rabbit</p>
          </section>
          <section className="attend-card">
            <p className="country-name-card">Albania</p>
            <p className="date-card">2021/03/04</p>
            <p className="holiday-name-card">Day of the Rabbit</p>
          </section>
          <section className="attend-card">
            <p className="country-name-card">Albania</p>
            <p className="date-card">2021/03/04</p>
            <p className="holiday-name-card">Day of the Rabbit</p>
          </section>
          <section className="attend-card">
            <p className="country-name-card">Albania</p>
            <p className="date-card">2021/03/04</p>
            <p className="holiday-name-card">Day of the Rabbit</p>
          </section>
          <section className="attend-card">
            <p className="country-name-card">Albania</p>
            <p className="date-card">2021/03/04</p>
            <p className="holiday-name-card">Day of the Rabbit</p>
          </section>
        </section>
      </section>
      <section className="avoid-container">
        <h2 className="avoid-title">Avoid</h2>
        <section className="avoid-cards-container">

        </section>
      </section>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <section className="back-button">HOME</section>
      </Link>
    </section>
  )
}

export default Saved