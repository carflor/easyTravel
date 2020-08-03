import React from 'react'
import ReactDOM from 'react-dom'
import '@testing-library/jest-dom/extend-expect'
import App from './App.js'
import { render, waitFor, fireEvent, screen, getAllByAltText } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { fetchCountries, fetchHolidays } from '../apiCalls'
jest.mock('../apiCalls')
import MutationObserver from '@sheerun/mutationobserver-shim'
import { act } from 'react-dom/test-utils'
window.MutationObserver = MutationObserver
// import { eraseDate } from './Saved/Saved'
// const eraseDate = jest.fn()

 
describe('App', () => {
  const originalError = console.error
  beforeAll(() => {
    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return
      }
      originalError.call(console, ...args)
    }
  })
  afterAll(() => {
    console.error = originalError
  })

  fetchCountries.mockResolvedValue([ 
    { key: "BA", value: 'Barbados'},
    { key: "BL", value: 'Belize'},
    { key: "BE", value: 'Benin'},
    { key: "BR", value: 'Brazil'}
  ])

  fetchHolidays.mockResolvedValue([ 
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
      "type": "School"
    },
    {
      "date": "2020-06-12",
      "localName": "Mock Example Name 3",
      "name": "Day of the Blue Butterflies",
      "countryCode": "BA",
      "type": "Government"
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
      </BrowserRouter>) 
    const title = getByText('EasyTravel')
    const label = getByText('Destination')
    const logInButton = getByRole('button', {name: 'GO!'})
    expect(title).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(logInButton).toBeInTheDocument()
  })

  it('Should be able to select a country and navigate into the holiday page', async () => {
    const { getByText, getByRole, getAllByRole, getByAltText, getAllByAltText, getByTestId, getAllByTestId } = render(
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

    //START OF NEXT INTEGRATION TEST ________________________________________________________>>
    const firstCardTitle = await waitFor(() => getByText(`New Year's Day`))
    const firstHolidayName = await waitFor(() => getByText('Mock Example Name 1', {exact: false}))
    const firstHolidayDate = await waitFor(() => getByText('2020-01-01'))
    const firstHolidayType = await waitFor(() => getByText('Public', {exact: false}))
    const secondCardTitle = await waitFor(() => getByText('Day of the Dog'))
    const secondHolidayName = await waitFor(() => getByText('Mock Example Name 2', {exact: false}))
    const secondHolidayDate = await waitFor(() => getByText('2020-10-01'))
    const secondHolidayType = await waitFor(() => getByText('School', {exact: false}))
    const thirdCardTitle = await waitFor(() => getByText('Day of the Blue Butterflies'))
    const thirdHolidayName = await waitFor(() => getByText('Mock Example Name 3', {exact: false}))
    const thirdHolidayDate = await waitFor(() => getByText('2020-06-12'))
    const thirdHolidayType = await waitFor(() => getByText('Government', {exact: false}))
    const thumbIcons = await waitFor(() => screen.getAllByRole('img'))
    const thumbsDownIcons = await waitFor(() => screen.getAllByAltText("thumb down icon"))
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

    // POSSIBLY TEST 3 CHECKING FOR ICONS ON HOLIDAY PAGE BEING CLICKED AND DISPLAYED ON SAVED ----- ->>>
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
    const firstSavedAvoidHoliday = getByText('Day of the Blue Buttrflies')
    const deleteIcons = getAllByRole('button', {name: 'X'})
    expect(savedAvoidTitle).toBeInTheDocument()
    expect(savedAttendTitle).toBeInTheDocument()
    expect(firstSavedAttendHoliday).toBeInTheDocument()
    expect(firstSavedAvoidHoliday).toBeInTheDocument()
    expect(deleteIcons.length).toEqual(2)

    act(() => {
      fireEvent.click(deleteIcons[0])
      fireEvent.click(deleteIcons[1])
    })

    expect(firstSavedAttendHoliday).not.toBeInTheDocument()

    // act(() => {
    //   fireEvent.click(deleteIcons[0])
    // })

    // expect(firstSavedAvoidHoliday).not.toBeInTheDocument()


    
  })

  // it('Should be able to vote on a holiday once user navigates to holiday page', async () => {
  //   const { getByText, getByRole, getByTestId, getAllByTestId } = render(
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>) 
    // const title = getByText('EasyTravel')
    // const label = getByText('Destination')
    // const goButton = getByRole('button', {name: 'GO!'})
    // const selectBox = getByTestId('select-box')
    // expect(title).toBeInTheDocument()
    // expect(label).toBeInTheDocument()
    // expect(goButton).toBeInTheDocument()
    // expect(selectBox).toBeInTheDocument()
    // act(() => {
    //   fireEvent.click(selectBox)
    // })
    // const countryOptions = await waitFor(() => getAllByTestId('select-option'))
    // const option1 = await waitFor(() => getByText('Belize'))
    // const option2 = await waitFor(() => getByText('Brazil'))
    // const option3 = await waitFor(() => getByText('Barbados'))
    // const option4 = await waitFor(() => getByText('Benin'))
    // expect(countryOptions.length).toEqual(4)
    // expect(option1).toBeInTheDocument()
    // expect(option2).toBeInTheDocument()
    // expect(option3).toBeInTheDocument()
    // expect(option4).toBeInTheDocument()
    // act(() => {
    //   fireEvent.change(selectBox, { target: { value: 'Barbados'}})
    //   fireEvent.click(selectBox, { target: { value: 'Barbados'}})
    // })
    // act(() => {
    //   fireEvent.click(goButton)
    // })
  //   const holidayPage = getByText('Holidays')
  //   const countryTitle = getByText('Barbados')
  //   const loadingMessage = getByText('Loading Holidays...')
  //   expect(holidayPage).toBeInTheDocument()
  //   expect(countryTitle).toBeInTheDocument()
  //   expect(loadingMessage).toBeInTheDocument()
  // })
})








// model for history of path test
// it('Should change locations when the log in button is clicked', async () => {
//   const testHistoryObject = createMemoryHistory()
  
//   getMovieData.mockResolvedValueOnce({
//     "movie": {
//       "id": 475430,
//       "title": "Artemis Fowl",
//       "poster_path": "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
//       "backdrop_path": "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
//       "release_date": "2020-06-12",
//       "overview": "Artemis Fowl is a 12-year-old genius and descendant of a long line of criminal masterminds. He soon finds himself in an epic battle against a race of powerful underground fairies who may be behind his father’s disappearance.",
//       "genres": [
//         "Adventure",
//         "Fantasy",
//         "Science Fiction",
//         "Family"
//       ],
//       "budget": 125000000,
//       "revenue": 0,
//       "runtime": 95,
//       "tagline": "Remember the name",
//       "average_rating": 3
//     }
//   })
  
//   getMovieComments.mockResolvedValueOnce(
//     [{  
//     "id": 1, 
//     "author": "albert", 
//     "movie_id": 338762, 
//     "comment": "Jumping street car! Look at those action scenes!"
//     },
//     { 
//     "id": 2, 
//     "author": "mike", 
//     "movie_id": 475430, 
//     "comment": "Conceptually amazing, it could almost be a book!"
//     }]
//   )
//   const { getAllByAltText } = render( 
//     <Router history={ testHistoryObject }>
//     <App />
//   </Router> )
//   expect(testHistoryObject.location.pathname).toEqual('/')
//   const movieLink = await waitFor(() => getAllByAltText('film-poster')[0])
//   fireEvent.click(movieLink) 
//   expect(testHistoryObject.location.pathname).toEqual('/movies/475430')
// })