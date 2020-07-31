import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
import App from './App.js'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
// import { fetchName } from './apiCalls'
// jest.mock('./apiCalls.js')

 
describe('App', () => {
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


})

