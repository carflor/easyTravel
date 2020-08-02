import React, { useState, useEffect } from 'react'
import './HolidayCard.css'
import thumbUp from '../Assets/thumb-up.png'
import thumbDown from '../Assets/thumb-down.png'


function HolidayCard({ holiday, isSelected, setAvoidArr, avoidArr, attendArr, setAttendArr }) {

  // conditional render for something being in local storage
  const [avoidItem, setAvoidItem] = useState(false)
  const [attendItem, setAttendItem] = useState(false)

  // localStorage.setItem('avoid', JSON.stringify('avoid'))
  // let avoidList = JSON.parse(localStorage.getItem('avoid') || '[]')
  // console.log(avoidList)
  // const [avoidArr, setAvoidArr] = useState([]) 
  const saveHoliday = (event) => {
    if (event.target.alt === 'thumb down icon') {
      holiday.country = isSelected.value
      setAvoidArr([...avoidArr, holiday])
      setAvoidItem(!avoidItem)
      // localStorage.setItem('avoid', JSON.stringify(holiday))
      // setAvoidArr([holiday])
      // avoidList.push(holiday)
    } 

    if (event.target.alt === 'thumb up icon') {
      holiday.country = isSelected.value
      setAttendArr([...attendArr, holiday])
      setAttendItem(!attendItem)
      // localStorage.setItem('attend', JSON.stringify(holiday))
    }

    if (avoidItem) {
      const match = avoidArr.find(day => day === holiday)
      const index = avoidArr.indexOf(match)
      const copyArr = [...avoidArr]
      const removeItem = copyArr.splice(index, 1)
      setAvoidArr(copyArr)
      // localStorage.removeItem('avoid', holiday)
    }

    if (attendItem) {
      const match = attendArr.find(day => day === holiday)
      const index = attendArr.indexOf(match)
      const copyArr = [...attendArr]
      const removeItem = copyArr.splice(index, 1)
      setAttendArr(copyArr)
      // localStorage.removeItem('attend', holiday)
    }
  }

  // const checkSaved = () => {
  // go through array of saved n state
  // if holiday object is in array then make sure to display no hands
  // }

  // useEffect(() => {
  //   checkSaved()
  // }, [ avoidItem, attendItem ])

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
        {!attendItem && <img 
          alt="thumb down icon"
          src={ thumbDown }
          className="thumb-down"
          onClick={saveHoliday}  
        />}
        {!avoidItem && <img 
          alt="thumb up icon"
          src={ thumbUp }
          className="thumb-up" 
          onClick={saveHoliday} 
        />}
      </section>
    </section>
  )
}

export default HolidayCard
