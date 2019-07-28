import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)

    if (names.includes(newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(p => p.name === newName)
        const personObject = {
          ...person,
          number: newNumber
        }
        personService
          .update(personObject.id, personObject)
          .then(returnedPerson => {
            console.log("phone number updated!")
            setPersons(persons.map(p => p.id !== personObject.id ? p : returnedPerson))
            setNewName("")
            setNewNumber("")
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          console.log("new person added!")
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
        })
    }
  }

  const deletePerson = id => {
    console.log(id)
    const person = persons.find(person => person.id === id)

    if(window.confirm(`Do you want to delete ${person.name}?`)){
      personService
        .deletePerson(id)
        .then(response => {
          console.log(`${person.name} deleted!`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const getFilteredPersons = () => {
    const regex = new RegExp(filter, "i")
    return persons.filter(person => person.name.match(regex))
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={getFilteredPersons()} deletePerson={deletePerson}/>
    </div>
  )

}

export default App