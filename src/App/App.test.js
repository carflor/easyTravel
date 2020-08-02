import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
import App from './App.js'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { fetchCountries, fetchHolidays } from '../apiCalls'
jest.mock('../apiCalls')

 
describe('App', () => {
  fetchCountries.mockResolvedValue( 
    { key: "BA", value: 'Barbados'},
    { key: "BL", value: 'Belize'},
    { key: "BE", value: 'Benin'},
    { key: "BR", value: 'Brazil'}
  )

  fetchHolidays.mockResolvedValue( 
    {
      "date": "2020-01-01",
      "localName": "Mock Example Name 1",
      "name": "New Year's Day",
      "countryCode": "BA",
      "type": "Public"
    },
    {
      "date": "2020-10-01",
      "localName": "Mock Example Name 2",
      "name": "Day of the Dog",
      "countryCode": "BA",
      "type": "Public"
    },
    {
      "date": "2020-06-12",
      "localName": "Mock Example Name 3",
      "name": "Day of the Blue Butterflies",
      "countryCode": "BA",
      "type": "Public"
    }
  )


  it('renders App', () => {
    const main = document.createElement('main')
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, main)
    ReactDOM.unmountComponentAtNode(main)
  })

  it('Should be able to render the nav items', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>) 
    const title = getByText('EasyTravel')
    const label = getByText('Destination')
    const logInButton = getByRole('button', {name: 'GO!'})
    expect(title).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(logInButton).toBeInTheDocument()
  })

  it('Should be able to select a country', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>) 
    const title = getByText('EasyTravel')
    const label = getByText('Destination')
    const logInButton = getByRole('button', {name: 'GO!'})
  })


})

