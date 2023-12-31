import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ successMessage, errorMessage}) => {
  if (successMessage !== null) {
    return (
      <div className='success'>
        {successMessage}
      </div>
    )
  }
  if (errorMessage !== null) {
    return (
      <div className='error'>
        {errorMessage}
      </div>
    )
  }
  return null
}

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
          <div key={person.name}>{person.name} {person.number} <button value={person.id} id={person.name} onClick={props.handleDelete}>delete</button></div>
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
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
        if(window.confirm(nameObj.name + " is already added to the phonebook, replace the old number with a new one?")){
          setPersons(persons.filter(p => p.name !== nameObj.name))
          personService
            .upDate(persons[i].id, nameObj)
            .then(response => {
              setPersons(persons.filter(p => p.name !== nameObj.name).concat(response.data))
              setNewName('')
              setNewNumber('')
              setSearchWord('')
              setShowAll(true)
              setSuccessMessage('Updated ' + nameObj.name)
              setTimeout(() => {
                setSuccessMessage(null)
              }, 5000)
            })
            .catch(error => {
              setPersons(persons.filter(p => p.name !== nameObj.name))
              setErrorMessage('Information of ' + nameObj.name + ' has already been removed from server')
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
        }
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
        setSuccessMessage('Added ' + nameObj.name)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
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
  const handleDelete = (event) => {
    if(window.confirm("Delete " + event.target.id + " ?")){
      personService
        .suppr(event.target.value)
        .then(
          setPersons(persons.filter(p => p.name !== event.target.id))
        )
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification successMessage={successMessage} errorMessage={errorMessage}/>
      <Filtre searchWord={searchWord} handleSearchChange={handleSearchChange} />
      <h3>add a new</h3>
      <Formulaire addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Affiche showPersons={showPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App