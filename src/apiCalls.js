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

const fetchCountries = () => {
  return fetch('https://fe-cors-proxy.herokuapp.com/', {
    headers: {
      'Target-URL': 'http://date.nager.at/Api/v2/AvailableCountries'
    }
  })
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Issue consolidating data! Please refresh.')
    }
  })

    // fetch('http://cors-anywhere.herokuapp.com/http://date.nager.at/Api/v2/AvailableCountries')
    //   .then((res) => res.json())
}

export { fetchHolidays, fetchCountries }