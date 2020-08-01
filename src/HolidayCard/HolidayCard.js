import React, { useState } from 'react'
import './HolidayCard.css'
import thumbUp from '../Assets/thumb-up.png'
import thumbDown from '../Assets/thumb-down.png'


function HolidayCard({ id, holiday, setSelected }) {
  // do i need a use effect for checking on load?
  const saveHoliday = (event) => {
    console.log(event.target, 'event in holiday icon')
    console.log(event.target.parentElement.parentElement.childNodes[0], 'event value in holiday icon')

    // setStatus
    // setStatus('avoid')
    // setStatus('attend')
    setSelected({
      avoid: [],
      attend: []
    })
  }




  return (
    <section className="holiday-card">
      <section className="data-container">
        <section className="names-container">
          <p className="holiday-name">{holiday.name}</p>
          <p className="holiday-local-name" data-testid='local-name'>Locally: {holiday.localName}</p>
        </section>
        <section className="date-type-container">
          <p className="holiday-date">{holiday.date}</p>
          <p className="holiday-type">{holiday.type} Holiday</p>
        </section>
      </section>
      <section className="thumb-container">
        <img 
          alt="thumb down icon"
          src={ thumbDown }
          className="thumb-down"
          onClick={saveHoliday}  
        />
        <img 
          alt="thumb up icon"
          src={ thumbUp }
          className="thumb-up"  
        />
      </section>
    </section>
  )
}

export default HolidayCard
