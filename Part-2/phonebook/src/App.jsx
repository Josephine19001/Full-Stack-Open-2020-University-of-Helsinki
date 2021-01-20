import React, { useState, useEffect } from "react";
import axios from "axios";

import Phonebook from "./components/Phonebook";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState([]);

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    //Checking for duplicate names
    for (let person of persons) {
      if (person.name === newName) {
        alert(`${newName} is already added to phonebook`);
      } else {
        setPersons(persons.concat(personObject));
        setNewName("");
        setNewNumber("");
      }
      console.log(setPersons);
    }
  };

  const handleNameChange = (event) => {
    const { value } = event.target;

    console.log(value);
    setNewName(value);
  };

  const handleNumberChange = (event) => {
    const { value } = event.target;

    console.log(value);
    setNewNumber(value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
    const searchedContact = showAll
      ? persons.filter(
          (person) =>
            person.name.toLowerCase().includes(filter.toLowerCase()) === true
        )
      : persons;
    setShowAll([...searchedContact]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons([...response.data]));
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFilter} />
      <br />
      <form onSubmit={addPerson}>
        <div>
          name :
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number :
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {showAll?.map((person, i) => (
          <Phonebook key={i} name={person.name} number={person.number} />
        ))}
      </ul>
    </div>
  );
};

export default App;
