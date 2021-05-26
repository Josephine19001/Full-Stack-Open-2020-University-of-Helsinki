import React, { useState, useEffect } from "react";

import Phonebook from "./components/Phonebook";
import Filter from "./components/Filter";
import personServices from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.length !== 0) {
      // Checking for duplicate names
      for (let p of persons) {
        if (p.name === person.name) {
          alert(`${person.name} is already added to phonebook`);

          if (p.number !== person.number) {
            const result = window.confirm(
              `${person.name} is already added to phonebook. Do you want to replace the old number with a new one?`
            );
            if (result) {
              personServices.updateNumber(person).then((returnedObj) => {
                console.log("success", returnedObj);
              });
            }
          }
        }
      }
    }
    personServices.create(person).then(() => {
      setPerson({
        name: "",
        number: "",
      });
    });
  };

  const handlePersonChange = (event) => {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const fetchData = () => {
    return personServices.getAllPersons().then((data) => setPersons([...data]));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFilter} />
      <br />
      <form onSubmit={addPerson}>
        <div>
          name :
          <input
            value={person.name}
            name="name"
            type="text"
            onChange={handlePersonChange}
          />
        </div>
        <div>
          number :
          <input
            value={person.number}
            name="number"
            type="text"
            onChange={handlePersonChange}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons
          ?.filter(
            (ps) =>
              ps?.name.toLowerCase().includes(filter?.toLowerCase()) === true
          )
          .map((ps) => (
            <div style={{ display: "flex" }}>
              <Phonebook key={ps.id} name={ps.name} number={ps.number} />
              <button
                onClick={() => {
                  personServices.deleteNumber(ps.id);
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
