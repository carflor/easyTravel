import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Saved from './Saved.js'
// import { fetchName } from './apiCalls'
// jest.mock('./apiCalls.js')

describe('Saved', () => {
  const avoidArr = [
    {
      counties: null,
      countryCode: 'AR',
      date: '2021-05-01',
      fixed: true,
      global: true,
      launchYear: null,
      localName: 'Día del Trabajador',
      name: 'Labour Day',
      type: 'Public'
    },
    {
      counties: null,
      countryCode: 'AR',
      date: '2020-12-10',
      fixed: true,
      global: true,
      launchYear: null,
      localName: 'Día para Dormir',
      name: 'Sleeping Day',
      type: 'Public'
    }
  ]

  const attendArr = [
    {
      counties: null,
      countryCode: 'BR',
      date: '2021-05-01',
      fixed: true,
      global: true,
      launchYear: null,
      localName: 'Día del Pajaro',
      name: 'Bird Day',
      type: 'Public'
    },
    {
      counties: null,
      countryCode: 'BR',
      date: '2020-12-10',
      fixed: true,
      global: true,
      launchYear: null,
      localName: 'Día para Comer',
      name: 'Eating Day',
      type: 'Public'
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
      </BrowserRouter>
    )
    const avoidSection = getByRole('heading', { name: 'Avoid' })
    const attendSection = getByRole('heading', { name: 'Attend' })
    const backButton = getByText('HOME')
    const typeDate = getByText('Bird Day')
    expect(avoidSection).toBeInTheDocument()
    expect(attendSection).toBeInTheDocument()
    expect(backButton).toBeInTheDocument()
    expect(typeDate).toBeInTheDocument()
  })

  it('Should remove deleted card', () => {
    const realUseState = React.useState
    const mockInitialState = [...attendArr]
    jest.spyOn(React, 'useState')
    jest.fn(() => realUseState(...attendArr))
    const { getByText, getAllByRole } = render(
      <BrowserRouter>
        <Saved avoidArr={avoidArr} attendArr={attendArr} />
      </BrowserRouter>
    )

    const deleteIcons = getAllByRole('button', { name: 'X' })
    const homeButton = getByText('HOME')

    expect(homeButton).toBeInTheDocument()
    expect(deleteIcons.length).toEqual(4)
    fireEvent.click(deleteIcons[0])
    fireEvent.click(deleteIcons[1])
    // fireEvent.click(deleteIcons[2])
    // fireEvent.click(deleteIcons[3])
    expect(deleteIcons.length).toEqual(2)
    // expect(mockInitialState.length).toEqual(0)
  })

  
  // Cache original functionality
  // const realUseState = React.useState
  // // Stub the initial state
  // const mockInitialState = ['mock data']
  // // Mock useState before rendering your component
  // jest
  //   .spyOn(React, 'useState')
  //   .mockImplementationOnce(() => realUseState(stubInitialState))

  // const title = getByText('C')
})
