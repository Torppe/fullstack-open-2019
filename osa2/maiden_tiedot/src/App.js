import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const getFilteredCountries = () => {
    const regex = new RegExp(filter, "i")
    return countries.filter(country => country.name.match(regex))
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <div>Find countries<input value={filter} onChange={handleFilterChange} /></div>
      <Countries countries={getFilteredCountries()} />
    </div>
  )

}

const Countries = ({ countries }) => {
  const names = countries.map(c => <div key={c.name}>{c.name}</div>)

  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  } else {
    return (
      <div>
        {names}
      </div>
    )
  }
}

const Country = ({country}) => {
  const languages = country.languages.map(c => <li key={c.name}>{c.name}</li>)

  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {languages}
      </ul>
      <img width="100" src={country.flag} alt="flag" />
    </div>
  )
}

export default App