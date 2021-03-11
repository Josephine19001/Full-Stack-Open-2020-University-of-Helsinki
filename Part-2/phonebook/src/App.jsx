import React, { useState, useEffect } from "react";

import Phonebook from "./components/Phonebook";
import Filter from "./components/Filter";
import personServices from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    personServices.getAllPersons().then((data) => setPersons(data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };
    if (persons.length !== 0) {
      
      // Checking for duplicate names
      for (let person of persons) {
        const updatedPerson = {
          number: newNumber
        };
        if (person.name === newPerson.name) {
          alert(`${newPerson.name} is already added to phonebook`);
        }
        if (person.number === newPerson.number) {
          const result = window.confirm(`${newPerson.name} is already added to phonebook. Do you want to replace the old number with a new one?`);
          if(result) {
            personServices.updateNumber(person.id, updatedPerson).then((returnedObj) => {
              console.log('success', returnedObj)
            });
          }
        }
      }
    }
    personServices.create(newPerson).then((returnedObj) => {
      setPersons(persons.concat(returnedObj));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setNewName(value);
  };

  const handleNumberChange = (event) => {
    const { value } = event.target;
    setNewNumber(value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

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
        {persons?.filter(
            (person) =>
              person?.name.toLowerCase().includes(filter?.toLowerCase()) === true
          )
          .map((person, i) => (
            <div style={{ display: "flex" }}>
              <Phonebook key={i} name={person.name} number={person.number} />
              <button
                onClick={() => {
                  personServices
                    .deleteNumber(person.id, person)
                    .then((res) => setPersons(persons.filter(p => p.id != person.id)));
                }}
              >
                delete
              </button>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default App;
