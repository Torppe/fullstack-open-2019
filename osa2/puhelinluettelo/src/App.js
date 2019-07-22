import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { 
      name: 'Arto Hellas'
    },
    { 
      name: 'Hrto Aellas'
    }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName
    }
    setPersons(persons.concat(personObject))
    setNewName("")
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
        <div>debug: {newName}</div>
          name: <input 
                  value={newName} 
                  onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons}/>
    </div>
  )

}

const Numbers = (props) => {
  const names = props.persons.map(person =>
    <div key={person.name}>{person.name}</div>
  )

  return (
    <div>
      {names}
    </div>
  )
}

export default App