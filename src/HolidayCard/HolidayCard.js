import React, { useState } from 'react'
import './HolidayCard.css'
import PropTypes from 'prop-types'
import thumbUp from '../Assets/thumb-up.png'
import thumbDown from '../Assets/thumb-down.png'

function HolidayCard({
  holiday, isSelected, setAvoidArr, avoidArr, attendArr, setAttendArr
}) {
  const [avoidItem, setAvoidItem] = useState(false)
  const [attendItem, setAttendItem] = useState(false)

  const saveHoliday = (event) => {
    if (event.target.alt === 'thumb down icon') {
      holiday.country = isSelected.value
      setAvoidArr([...avoidArr, holiday])
      setAvoidItem(!avoidItem)
    }

    if (event.target.alt === 'thumb up icon') {
      holiday.country = isSelected.value
      setAttendArr([...attendArr, holiday])
      setAttendItem(!attendItem)
    }

    if (avoidItem) {
      const match = avoidArr.find((day) => day === holiday)
      const index = avoidArr.indexOf(match)
      const copyArr = [...avoidArr]
      const removeItem = copyArr.splice(index, 1)
      setAvoidArr(copyArr)
    }

    if (attendItem) {
      const match = attendArr.find((day) => day === holiday)
      const index = attendArr.indexOf(match)
      const copyArr = [...attendArr]
      const removeItem = copyArr.splice(index, 1)
      setAttendArr(copyArr)
    }
  }

  return (
    <section className="holiday-card">
      <section className="data-container">
        <section className="names-container">
          <p className="holiday-name">{holiday.name}</p>
          <p className="holiday-local-name" data-testid="local-name">
            Locally:
            {holiday.localName}
          </p>
        </section>
        <section className="date-type-container">
          <p className="holiday-date">{holiday.date}</p>
          <p className="holiday-type">
            {holiday.type}
            {' '}
            Holiday
          </p>
        </section>
      </section>
      <section className="thumb-container">
        {!attendItem && (
        <img
          type="button"
          tabIndex="0"
          alt="thumb down icon"
          src={thumbDown}
          className="thumb-down"
          onClick={saveHoliday}
        />
        )}
        {!avoidItem && (
        <img
          type="button"
          tabIndex="0"
          alt="thumb up icon"
          src={thumbUp}
          className="thumb-up"
          onClick={saveHoliday}
        />
        )}
      </section>
    </section>
  )
}

export default HolidayCard

HolidayCard.propTypes = {
  holiday: PropTypes.object,
  isSelected: PropTypes.object,
  setAttendArr: PropTypes.func,
  setAvoidArr: PropTypes.func,
  avoidArr: PropTypes.array,
  attendArr: PropTypes.array
}
