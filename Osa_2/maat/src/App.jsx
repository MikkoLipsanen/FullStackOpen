import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([{}])

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const countriesToShow = countryFilter === ''
    ? countries
    : countries.filter(country => country.name.common.toUpperCase().includes(countryFilter.toUpperCase()))

  return (
    <div>
      <p>
        find countries: <input value={countryFilter} onChange={handleChange} />
      </p>
      <Countries countriesToShow={countriesToShow} setCountryFilter={setCountryFilter}/>
    </div>
  )
}

export default App