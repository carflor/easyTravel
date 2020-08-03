import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
import {
  render, waitFor, fireEvent, screen
} from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom'
import MutationObserver from '@sheerun/mutationobserver-shim'
import { act } from 'react-dom/test-utils'
import { fetchCountries, fetchHolidays } from '../apiCalls'
import App from './App.js'
jest.mock('../apiCalls')
window.MutationObserver = MutationObserver

describe('App', () => {
  const originalError = console.error
  beforeAll(() => {
    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return
      }
      // this is causing an error in console
      // originalError.call(console, ...args)
    }
  })
  afterAll(() => {
    console.error = originalError
  })

  fetchCountries.mockResolvedValue([
    { key: 'BA', value: 'Barbados' },
    { key: 'BL', value: 'Belize' },
    { key: 'BE', value: 'Benin' },
    { key: 'BR', value: 'Brazil' }
  ])

  fetchHolidays.mockResolvedValue([
    {
      date: '2020-01-01',
      localName: 'Mock Example Name 1',
      name: "New Year's Day",
      countryCode: 'BA',
      type: 'Public'
    },
    {
      date: '2020-10-01',
      localName: 'Mock Example Name 2',
      name: 'Day of the Dog',
      countryCode: 'BA',
      type: 'School'
    },
    {
      date: '2020-06-12',
      localName: 'Mock Example Name 3',
      name: 'Day of the Blue Butterflies',
      countryCode: 'BA',
      type: 'Government'
    }
  ])

  it('renders App', () => {
    const main = document.createElement('main')
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, main)
    ReactDOM.unmountComponentAtNode(main)
  })

  it('Should be able to render the nav items', () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    const title = getByText('EasyTravel')
    const label = getByText('Destination')
    const logInButton = getByRole('button', { name: 'GO!' })
    expect(title).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(logInButton).toBeInTheDocument()
  })

  it('Should be able to select a country and navigate into the holiday page, vote on holidays and see them in the appropriate sections in saved component', async () => {
    const {
      getByText, getByRole, getAllByRole, getByAltText, getAllByAltText, getByTestId, getAllByTestId
    } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    const title = getByText('EasyTravel')
    const label = getByText('Destination')
    const goButton = getByRole('button', { name: 'GO!' })
    const selectBox = getByTestId('select-box')
    expect(title).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(goButton).toBeInTheDocument()
    expect(selectBox).toBeInTheDocument()

    act(() => {
      fireEvent.click(selectBox)
    })

    const countryOptions = await waitFor(() => getAllByTestId('select-option'))
    const option1 = await waitFor(() => getByText('Belize'))
    const option2 = await waitFor(() => getByText('Brazil'))
    const option3 = await waitFor(() => getByText('Barbados'))
    const option4 = await waitFor(() => getByText('Benin'))
    expect(countryOptions.length).toEqual(4)
    expect(option1).toBeInTheDocument()
    expect(option2).toBeInTheDocument()
    expect(option3).toBeInTheDocument()
    expect(option4).toBeInTheDocument()

    act(() => {
      fireEvent.change(selectBox, { target: { value: 'Barbados' } })
      fireEvent.click(selectBox, { target: { value: 'Barbados' } })
    })

    act(() => {
      fireEvent.click(goButton)
    })

    expect(title).not.toBeInTheDocument()
    expect(label).not.toBeInTheDocument()
    expect(goButton).not.toBeInTheDocument()
    expect(selectBox).not.toBeInTheDocument()

    const holidayBackButton = getByText('Holidays')
    const countryTitle = getByText('Barbados')
    const loadingMessage = getByText('Loading Holidays...')
    expect(holidayBackButton).toBeInTheDocument()
    expect(countryTitle).toBeInTheDocument()
    expect(loadingMessage).toBeInTheDocument()

    // START OF INTEGRATION TEST 2 - HOLIDAYS PAGE______________________________>>
    const firstCardTitle = await waitFor(() => getByText('New Year\'s Day'))
    const firstHolidayName = await waitFor(() => getByText('Mock Example Name 1', { exact: false }))
    const firstHolidayDate = await waitFor(() => getByText('2020-01-01'))
    const firstHolidayType = await waitFor(() => getByText('Public', { exact: false }))
    const secondCardTitle = await waitFor(() => getByText('Day of the Dog'))
    const secondHolidayName = await waitFor(() => getByText('Mock Example Name 2', { exact: false }))
    const secondHolidayDate = await waitFor(() => getByText('2020-10-01'))
    const secondHolidayType = await waitFor(() => getByText('School', { exact: false }))
    const thirdCardTitle = await waitFor(() => getByText('Day of the Blue Butterflies'))
    const thirdHolidayName = await waitFor(() => getByText('Mock Example Name 3', { exact: false }))
    const thirdHolidayDate = await waitFor(() => getByText('2020-06-12'))
    const thirdHolidayType = await waitFor(() => getByText('Government', { exact: false }))
    const thumbIcons = await waitFor(() => screen.getAllByRole('img'))
    const thumbsDownIcons = await waitFor(() => screen.getAllByAltText('thumb down icon'))
    const thumbsUpIcons = await waitFor(() => screen.getAllByAltText('thumb up icon'))
    expect(firstCardTitle).toBeInTheDocument()
    expect(firstHolidayName).toBeInTheDocument()
    expect(firstHolidayDate).toBeInTheDocument()
    expect(firstHolidayType).toBeInTheDocument()
    expect(secondCardTitle).toBeInTheDocument()
    expect(secondHolidayName).toBeInTheDocument()
    expect(secondHolidayDate).toBeInTheDocument()
    expect(secondHolidayType).toBeInTheDocument()
    expect(thirdCardTitle).toBeInTheDocument()
    expect(thirdHolidayName).toBeInTheDocument()
    expect(thirdHolidayDate).toBeInTheDocument()
    expect(thirdHolidayType).toBeInTheDocument()
    expect(thumbIcons.length).toEqual(6)
    expect(thumbsDownIcons.length).toEqual(3)
    expect(thumbsUpIcons.length).toEqual(3)

    // START OF TEST 3 - SAVED PAGE INTEGRATION TEST--------------- ----- ->>>
    act(() => {
      fireEvent.click(thumbsUpIcons[0])
      fireEvent.click(thumbsUpIcons[1])
      fireEvent.click(thumbsDownIcons[2])
      fireEvent.click(holidayBackButton)
    })

    const returnToMainTitle = getByText('EasyTravel')
    const calendarIcon = getByAltText('calendar icon')
    expect(returnToMainTitle).toBeInTheDocument()
    expect(calendarIcon).toBeInTheDocument()

    act(() => {
      fireEvent.click(calendarIcon)
    })

    expect(returnToMainTitle).not.toBeInTheDocument()
    expect(calendarIcon).not.toBeInTheDocument()

    const savedAvoidTitle = getByText('Avoid')
    const savedAttendTitle = getByText('Attend')
    const firstSavedAttendHoliday = getByText('Day of the Dog')
    // const secondSavedAttendHoliday = getByText(`New Year's Day`)
    const firstSavedAvoidHoliday = getByText('Day of the Blue Butterflies')
    const deleteIcons = getAllByRole('button', { name: 'X' })
    const homeBtn = getByText('HOME')
    expect(savedAvoidTitle).toBeInTheDocument()
    expect(savedAttendTitle).toBeInTheDocument()
    expect(firstSavedAttendHoliday).toBeInTheDocument()
    expect(firstSavedAvoidHoliday).toBeInTheDocument()
    expect(deleteIcons.length).toEqual(2)
    expect(homeBtn).toBeInTheDocument()

    // Integration Test 4 for switching from saved component back to app ------------>>>>>>>>>>>>
    act(() => {
      fireEvent.click(deleteIcons[0])
      fireEvent.click(deleteIcons[1])
      fireEvent.click(homeBtn)
    })

    const backToMainTitle = getByText('EasyTravel')
    const backToGoBtn = getByRole('button', {name: 'GO!'})
    expect(backToMainTitle).toBeInTheDocument()
    expect(backToGoBtn).toBeInTheDocument()
  })

  it('Should be able to vote on a holiday once user navigates to holiday page', async () => {
    const { getByText, getByRole, getByTestId, getAllByTestId } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>)
    const title = getByText('EasyTravel')
    const label = getByText('Destination')
    const goButton = getByRole('button', {name: 'GO!'})
    const selectBox = getByTestId('select-box')
    expect(title).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(goButton).toBeInTheDocument()
    expect(selectBox).toBeInTheDocument()
    act(() => {
      fireEvent.click(selectBox)
    })
    const countryOptions = await waitFor(() => getAllByTestId('select-option'))
    const option1 = await waitFor(() => getByText('Belize'))
    const option2 = await waitFor(() => getByText('Brazil'))
    const option3 = await waitFor(() => getByText('Barbados'))
    const option4 = await waitFor(() => getByText('Benin'))
    expect(countryOptions.length).toEqual(4)
    expect(option1).toBeInTheDocument()
    expect(option2).toBeInTheDocument()
    expect(option3).toBeInTheDocument()
    expect(option4).toBeInTheDocument()
    act(() => {
      fireEvent.change(selectBox, { target: { value: 'Barbados'}})
      fireEvent.click(selectBox, { target: { value: 'Barbados'}})
    })
    act(() => {
      fireEvent.click(goButton)
    })
    const holidayPage = getByText('Holidays')
    const countryTitle = getByText('Barbados')
    const loadingMessage = getByText('Loading Holidays...')
    expect(holidayPage).toBeInTheDocument()
    expect(countryTitle).toBeInTheDocument()
    expect(loadingMessage).toBeInTheDocument()
  })

  it('Should change location when saved icon button is clicked', async () => {
    const testHistoryObject = createMemoryHistory()
    const { getByText, getByRole, getByTestId, getAllByTestId } = render(
      <Router history={testHistoryObject} >
        <App />
      </Router>)
    expect(testHistoryObject.location.pathname).toEqual('/')
    const calendarIcon = getByRole('img')
    expect(calendarIcon).toBeInTheDocument()
    fireEvent.click(calendarIcon)
    expect(testHistoryObject.location.pathname).toEqual('/saved')
  })

  it('Should change path location when country is selected and go button is clicked', async () => {
    const testHistoryObject = createMemoryHistory()
    const { getByText, getByRole, getByTestId, getAllByTestId } = render(
      <Router history={testHistoryObject} >
        <App />
      </Router>)
    expect(testHistoryObject.location.pathname).toEqual('/')
    const calendarIcon = getByRole('img')
    const goButton = getByRole('button', {name: 'GO!'})
    const selectBox = getByTestId('select-box')
    expect(calendarIcon).toBeInTheDocument()
    expect(goButton).toBeInTheDocument()
    expect(selectBox).toBeInTheDocument()
    act(() => {
      fireEvent.click(selectBox)
    })
    const countryOptions = await waitFor(() => getAllByTestId('select-option'))
    const option1 = await waitFor(() => getByText('Belize'))
    const option2 = await waitFor(() => getByText('Brazil'))
    const option3 = await waitFor(() => getByText('Barbados'))
    const option4 = await waitFor(() => getByText('Benin'))
    expect(countryOptions.length).toEqual(4)
    expect(option1).toBeInTheDocument()
    expect(option2).toBeInTheDocument()
    expect(option3).toBeInTheDocument()
    expect(option4).toBeInTheDocument()
    act(() => {
      fireEvent.change(selectBox, { target: { value: 'Brazil'}})
      fireEvent.click(selectBox, { target: { value: 'Brazil'}})
    })
    act(() => {
      fireEvent.click(goButton)
    })
    expect(testHistoryObject.location.pathname).toEqual('/countries/Brazil/holidays')
  })

  it('Should dynamically change location when a different country is selected and go button is clicked', async () => {
    const testHistoryObject = createMemoryHistory()
    const { getByText, getByRole, getByTestId, getAllByTestId } = render(
      <Router history={testHistoryObject} >
        <App />
      </Router>)
    expect(testHistoryObject.location.pathname).toEqual('/')
    const calendarIcon = getByRole('img')
    const goButton = getByRole('button', {name: 'GO!'})
    const selectBox = getByTestId('select-box')
    expect(calendarIcon).toBeInTheDocument()
    expect(goButton).toBeInTheDocument()
    expect(selectBox).toBeInTheDocument()
    act(() => {
      fireEvent.click(selectBox)
    })
    const countryOptions = await waitFor(() => getAllByTestId('select-option'))
    const option1 = await waitFor(() => getByText('Belize'))
    const option2 = await waitFor(() => getByText('Brazil'))
    const option3 = await waitFor(() => getByText('Barbados'))
    const option4 = await waitFor(() => getByText('Benin'))
    expect(countryOptions.length).toEqual(4)
    expect(option1).toBeInTheDocument()
    expect(option2).toBeInTheDocument()
    expect(option3).toBeInTheDocument()
    expect(option4).toBeInTheDocument()
    act(() => {
      fireEvent.change(selectBox, { target: { value: 'Benin'}})
      fireEvent.click(selectBox, { target: { value: 'Benin'}})
    })
    act(() => {
      fireEvent.click(goButton)
    })
    expect(testHistoryObject.location.pathname).toEqual('/countries/Benin/holidays')
  })

  it('should render error message if fetch is not successful', async () => {
    fetchCountries.mockRejectedValueOnce(new Error('Issue consolidating data! Please refresh.'))
    const { getByText } = render(
      <MemoryRouter><App /></MemoryRouter>
    )
    const pageTitle = getByText("EasyTravel")
    const errorMessage = await waitFor(() => getByText('Error getting data, please refresh!'))
    expect(pageTitle).toBeInTheDocument()
    expect(errorMessage).toBeInTheDocument()
  })
})
