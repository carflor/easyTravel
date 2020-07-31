// const url = 'https://rancid-tomatillos.herokuapp.com/api/v2'
// const microUrl = 'http://localhost:3001/api/v1'

// const getMovies = () => {
//   return fetch(`${url}/movies`)
//     .then(response => {
//       if(response.ok) {
//         return response.json() 
//       } else {
//         throw new Error('Pardon the disturbance in the force...')
//       }
//     })
// }

const fetchHolidays = (key) => {
  return fetch('https://fe-cors-proxy.herokuapp.com/', {
      headers: {
        'Target-URL': `https://date.nager.at/Api/v2/NextPublicHolidays/${key}`
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Issue consolidating data! Please refresh.')
        }
      })
}

export { fetchHolidays }