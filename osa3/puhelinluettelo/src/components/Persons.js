import React from 'react';

const Persons = (props) => {
  const names = props.persons.map(person =>
    <div key={person.name}>{person.name} {person.number} <button onClick={() => props.deletePerson(person.id)}>delete</button></div>
  )

  return (
    <div>
      {names}
    </div>
  )
}

export default Persons;