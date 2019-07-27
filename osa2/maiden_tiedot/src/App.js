import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    const regex = new RegExp(event.target.value, "i")
    setFilter(event.target.value)
    setFilteredCountries(countries.filter(country => country.name.match(regex)))
  }

  const handleClick = (country) => {
    setFilteredCountries(countries.filter(c => c.name === country.name))
  }

  return (
    <div>
      <div>Find countries<input value={filter} onChange={handleFilterChange} /></div>
      <Countries countries={filteredCountries} handleClick={handleClick} />
    </div>
  )
}

const Countries = ({ countries, handleClick}) => {
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
    const names = countries.map(c => <div key={c.name}>{c.name}<button onClick={() => handleClick(c)}>show</button></div>)
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