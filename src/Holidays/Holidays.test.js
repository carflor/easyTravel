import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Holidays from './Holidays.js'

describe('Holidays', () => {
  const isSelected = { value: 'Madagascar', key: 'MD' }

  it('Renders Holidays component', () => {
    const main = document.createElement('main')
    ReactDOM.render(<BrowserRouter><Holidays isSelected={isSelected} /></BrowserRouter>, main)
    ReactDOM.unmountComponentAtNode(main)
  })

  it('Should display loading message before fetch resolves', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Holidays isSelected={isSelected} />
      </BrowserRouter>
    )
    const pageTitle = getByText('Holidays')
    const countryTitle = getByText('Madagascar')
    const loadingMessage = getByText('Loading Holidays...')
    expect(pageTitle).toBeInTheDocument()
    expect(countryTitle).toBeInTheDocument()
    expect(loadingMessage).toBeInTheDocument()
  })
})
