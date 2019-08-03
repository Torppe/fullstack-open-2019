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
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const generateMessage = (message, isSuccessful) => {
    const errorMessage = {
      message: message,
      successful: isSuccessful
    }

    setErrorMessage(errorMessage)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  } 

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
            setPersons(persons.map(p => p.id !== personObject.id ? p : returnedPerson))
            setNewName("")
            setNewNumber("")
            generateMessage(`Updated phone number of ${returnedPerson.name}!`, true)
          })
          .catch(error => {
            generateMessage(`Information of ${personObject.name} has already been removed from server!`, false)
            setPersons(persons.filter(p => p.id !== personObject.id))
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
          setPersons(persons.concat(returnedPerson))
          setNewName("")
          setNewNumber("")
          generateMessage(`${returnedPerson.name} added!`, true)
        })
        .catch(error => {
          generateMessage(error.response.data, false)
        })
    }
  }

  const deletePerson = id => {
    const person = persons.find(person => person.id === id)

    if(window.confirm(`Do you want to delete ${person.name}?`)){
      personService
        .deletePerson(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          generateMessage(`${person.name} deleted!`, true)
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
      <Notification message={errorMessage}/>
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

const Notification = ({message}) => {
  const successStyle = {
    color: 'black',
    background: '#87ff87',
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: 'black',
    background: 'red',
    fontSize: 20,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if(message === null){
    return null
  }

  return (
    <div style={message.successful ? successStyle : errorStyle}>
      {message.message}
    </div>
  )
}

export default App