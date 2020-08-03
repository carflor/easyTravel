import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Form from './Form.js'
// import { fetchName } from './apiCalls'
// jest.mock('./apiCalls.js')
const submitCountry = jest.fn()

describe('Form', () => {
  const countries = [
    { value: 'Albania', key: 'AL' },
    { value: 'Costa Rica', key: 'CR' },
    { value: 'Germany', key: 'GR' }
  ]

  it('renders a Form', () => {
    const main = document.createElement('main')
    ReactDOM.render(<BrowserRouter><Form countries={countries} submitCountry={submitCountry} /></BrowserRouter>, main)
    ReactDOM.unmountComponentAtNode(main)
  })

  it('Should be able to render the nav items', () => {
    const { getByText, getByTestId } = render(
      <BrowserRouter>
        <Form countries={countries} submitCountry={submitCountry} />
      </BrowserRouter>
    )
    const button = getByText('GO!')
    const selectBox = getByTestId('select-box')
    expect(button).toBeInTheDocument()
    expect(selectBox).toBeInTheDocument()
  })
})
