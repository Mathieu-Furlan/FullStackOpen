import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchWord, setSearchWord] = useState('')
  const [showAll, setShowAll] = useState(true)

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
    setPersons(persons.concat(nameObj))
    setNewName('')
    setNewNumber('')
    setSearchWord('')
    setShowAll(true)
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
      filter shown with<input value={searchWord} onChange={handleSearchChange} />
      <h2>add a new</h2>
      <form onSubmit = {addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {showPersons.map(person => 
          <div key={person.name}>{person.name} {person.number}</div>
        )}
    </div>
  )
}

export default App