import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

 
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
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (names.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(p => p.name === newName)
        personService
        .update(person.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Added new number ${newNumber} for ${newName}`
          )
          setMessageType('notification')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
        }) 
        .catch(error => {
          setMessage(
              `Information on ${newName} has been removed from the server.`
          )
          setPersons(persons.filter(p => p.id !== person.id))
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
        })
      }
    } else {
      personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(
          `Added ${newName}`
        )
        setMessageType('notification')
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000)
      }) 
      .catch(error => {
        setMessage(error.response.data.error)
        setMessageType('error')
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000)
      })
    }
  }

  const removePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .deletePerson(person.id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(p => p.id !== person.id))
          setMessage(
            `Deleted ${person.name}`
          )
          setMessageType('notification')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
      }) 
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson}/>
    </div>
  )

}

export default App