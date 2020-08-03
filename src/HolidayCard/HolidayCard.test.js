import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import HolidayCard from './HolidayCard.js'
// import { fetchName } from './apiCalls'
// jest.mock('./apiCalls.js')

describe('HolidayCard', () => {
  const holidayObj = {
    counties: null,
    countryCode: 'AR',
    date: '2021-05-01',
    fixed: true,
    global: true,
    launchYear: null,
    localName: 'Día del Trabajador',
    name: 'Labour Day',
    type: 'Public'
  }

  it('Renders HolidayCard', () => {
    const main = document.createElement('main')
    ReactDOM.render(
      <BrowserRouter>
        <HolidayCard key={1} holiday={holidayObj} />
      </BrowserRouter>, main
    )
    ReactDOM.unmountComponentAtNode(main)
  })

  it('Should be able to render the HolidayCard elements', () => {
    const { getByText, getByAltText, getByTestId } = render(
      <BrowserRouter>
        <HolidayCard key={1} holiday={holidayObj} />
      </BrowserRouter>
    )
    const name = getByText('Labour Day')
    const localName = getByTestId('local-name')
    const type = getByText('Public Holiday')
    const date = getByText('2021-05-01')
    const avoidButton = getByAltText('thumb down icon')
    const attendButton = getByAltText('thumb up icon')
    expect(name).toBeInTheDocument()
    expect(localName).toBeInTheDocument()
    expect(date).toBeInTheDocument()
    expect(type).toBeInTheDocument()
    expect(avoidButton).toBeInTheDocument()
    expect(attendButton).toBeInTheDocument()
  })
})
