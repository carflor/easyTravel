import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
import Saved from './Saved.js'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
// import { fetchName } from './apiCalls'
// jest.mock('./apiCalls.js')
 
describe('Saved', () => {
  const avoidArr = [
    {
      counties: null,
      countryCode: "AR",
      date: "2021-05-01",
      fixed: true,
      global: true,
      launchYear: null,
      localName: "Día del Trabajador",
      name: "Labour Day",
      type: "Public"
    },
    {
      counties: null,
      countryCode: "AR",
      date: "2020-12-10",
      fixed: true,
      global: true,
      launchYear: null,
      localName: "Día para Dormir",
      name: "Sleeping Day",
      type: "Public"
    }
  ]

  const attendArr = [
    {
      counties: null,
      countryCode: "BR",
      date: "2021-05-01",
      fixed: true,
      global: true,
      launchYear: null,
      localName: "Día del Pajaro",
      name: "Bird Day",
      type: "Public"
    },
    {
      counties: null,
      countryCode: "BR",
      date: "2020-12-10",
      fixed: true,
      global: true,
      launchYear: null,
      localName: "Día para Comer",
      name: "Eating Day",
      type: "Public"
    }
  ]

  it('renders Saved component', () => {
    const main = document.createElement('main')
    ReactDOM.render(<BrowserRouter><Saved avoidArr={avoidArr} attendArr={attendArr} /></BrowserRouter>, main)
    ReactDOM.unmountComponentAtNode(main)
  })

  it('Should be able to render the page items', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <Saved avoidArr={avoidArr} attendArr={attendArr} />
      </BrowserRouter>) 
    const avoidSection = getByRole('heading', { name:'Avoid' })
    const attendSection = getByRole('heading', { name:'Attend' })
    const backButton = getByText('HOME')
    const typeDate = getByText('Bird Day')
    expect(avoidSection).toBeInTheDocument()
    expect(attendSection).toBeInTheDocument()
    expect(backButton).toBeInTheDocument()
    expect(typeDate).toBeInTheDocument()
  })


})