import React from 'react'
import './HolidayCard.css'
import thumbUp from '../Assets/thumb-up.png'
import thumbDown from '../Assets/thumb-down.png'

function HolidayCard({ holiday }) {
  console.log(holiday, 'holiday in card component')
  return (
    <section className="holiday-card">
      <section className="data-container">
        <section className="names-container">
          <p className="holiday-name">{holiday.name}</p>
          <p className="holiday-local-name">Local Name: {holiday.localName}</p>
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
