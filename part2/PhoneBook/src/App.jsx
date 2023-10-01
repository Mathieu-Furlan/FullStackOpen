import { useState, useEffect } from 'react'
import personService from './services/persons'

const Formulaire = (props) => {
  return (
    <div>
      <form onSubmit = {props.addName}>
        <div>
          name: <input value={props.newName} onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Affiche = (props) => {
  return (
    <div>
      {props.showPersons.map(person => 
          <div key={person.name}>{person.name} {person.number}</div>
      )}
    </div>
  )
}

const Filtre = (props) => {
  return (
    <div>
      filter shown with<input value={props.searchWord} onChange={props.handleSearchChange} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObj = {
      name: newName,
      number: newNumber
    }
    for(let i = 0; i <= persons.length - 1; i++){
      if(persons[i].name === nameObj.name){
        window.alert(nameObj.name + " is already added to the phonebook")
        return
      }
    }

    personService
      .create(nameObj)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setSearchWord('')
        setShowAll(true)
      })
  }

  const showPersons = searchWord === '' || showAll ? persons : persons.filter(person => {
    if(person.name.toLowerCase().indexOf(searchWord.toLowerCase()) >= 0){
      return true
    }
    return false
  })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearchWord(event.target.value)
    setShowAll(false)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filtre searchWord={searchWord} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <Formulaire addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Affiche showPersons={showPersons} />
    </div>
  )
}

export default App