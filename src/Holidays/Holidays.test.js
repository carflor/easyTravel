import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
import Holidays from './Holidays.js'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
// import { fetchHolidays } from '../apiCalls'
// import { act } from 'react-dom/test-utils'
// jest.mock('../apiCalls.js')

 
describe('Holidays', () => {
  const isSelected = { value: 'Madagascar', key: 'MD' }
  // fetchHolidays.mockResolvedValue([
  //   {
  //     "date": "2020-01-01",
  //     "localName": "Viti i Ri",
  //     "name": "New Year's Day",
  //     "countryCode": "AL",
  //     "fixed": true,
  //     "global": true,
  //     "counties": null,
  //     "launchYear": null,
  //     "type": "Public"
  //   },
  //   {
  //     "date": "2020-01-02",
  //     "localName": "Viti i Ri",
  //     "name": "New Year's Day",
  //     "countryCode": "AL",
  //     "fixed": true,
  //     "global": true,
  //     "counties": null,
  //     "launchYear": null,
  //     "type": "Public"
  //   }
  // ])

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