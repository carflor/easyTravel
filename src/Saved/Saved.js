import React, { useState, useEffect } from 'react'
import './Saved.css'
import { Link } from 'react-router-dom'

function Saved({ attendArr, avoidArr, setAvoidArr, setAttendArr }) {
  const grabAttendList = () => {
    return attendArr.map(card => {
      return (
        <section key={`${card.country} ${card.name}`} className="attend-card">
          <p className="country-name-card">{card.country}</p>
          <p className="date-card">{card.date}</p>
          <p className="holiday-name-card">{card.name}</p>
          <p className="holiday-type">{card.type} Holiday</p>
          <button onClick={(e) => eraseDate(e)} className="remove-btn">X</button>
        </section>
      )
    })
  }

  const grabAvoidList = () => {
    return avoidArr.map(card => {
      return (
        <section key={`${card.country} ${card.name}`} className="avoid-card">
          <p className="country-name-card">{card.country}</p>
          <p className="date-card">{card.date}</p>
          <p className="holiday-name-card">{card.name}</p>
          <p className="holiday-type">{card.type} Holiday</p>
          <button onClick={(e) => eraseDate(e)} className="remove-btn">X</button>
        </section>
      )
    })
  }

  useEffect(() => {
    grabAttendList()
    grabAvoidList()
  }, [])

  const eraseDate = (event) => {
    const clickedCountry = event.target.parentElement.childNodes[0].innerText
    const clickedDate = event.target.parentElement.childNodes[1].innerText
    if (event.target.parentElement.classList[0] === 'attend-card') {
      const foundAttend = attendArr.find(holiday => holiday.date === clickedDate && holiday.country === clickedCountry)
      if (foundAttend) {
        const match = attendArr.find(day => day === foundAttend)
        const index = attendArr.indexOf(match)
        const copyArr = [...attendArr]
        const removeItem = copyArr.splice(index, 1)
        setAttendArr(copyArr)
      }
    } else if (event.target.parentElement.classList[0] === 'avoid-card') {
      const foundAvoid = avoidArr.find(holiday => holiday.date === clickedDate && holiday.country === clickedCountry)
      if (foundAvoid) {
        const match = avoidArr.find(day => day === foundAvoid)
        const index = avoidArr.indexOf(match)
        const copyArr = [...avoidArr]
        const removeItem = copyArr.splice(index, 1)
        setAvoidArr(copyArr)
      }
    }
  }

  return (
    <section className="saved-page">
      <section className="attend-container">
        <h2 className="attend-title">Attend</h2>
        <section className="attend-cards-container">
          {grabAttendList()}
        </section>
      </section>
      <section className="avoid-container">
        <h2 className="avoid-title">Avoid</h2>
        <section className="avoid-cards-container">
          {grabAvoidList()}
        </section>
      </section>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <section className="back-button">HOME</section>
      </Link>
    </section>
  )
}

export default Saved
