import React, { useState, useEffect } from "react";

import Phonebook from "./components/Phonebook";
import Filter from "./components/Filter";
import personServices from "./services/phonebook";
import {
  ErrorNotification,
  SuccessNotification,
} from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [person, setPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [success, setSuccess] = useState({
    isSuccess: false,
    message: "",
  });

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
              personServices.updateNumber(p.id, person).then((returnedObj) => {
                setSuccess({
                  ...success,
                  isSuccess: true,
                  message: `Successfully updated ${returnedObj.name}`,
                });
              });
            }
          }
        }
      }
    }
    personServices.create(person).then((p) => {
      setSuccess({
        ...success,
        isSuccess: true,
        message: `Successfully added ${p.name}`,
      });
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

  const handleDeletePerson = (person) => {
    personServices
      .deleteNumber(person.id)
      .then(() => {
        setSuccess({
          ...success,
          isSuccess: true,
          message: `Successfully deleted ${person.name}`,
        });
      })
      .catch((error) => {
        setError({ ...error, isError: true, message: error.message });
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await personServices
        .getAllPersons()
        .then((data) => data)
        .catch((error) => {
          setError({ ...error, isError: true, message: error.message });
        });

      setPersons(result);
    };

    fetchData();
  }, [success.message, person]);

  return (
    <div>
      <h2>Phonebook</h2>
      {error.isError && <ErrorNotification message={error.message} />}
      {success.isSuccess && <SuccessNotification message={success.message} />}
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
            <div style={{ display: "flex" }} key={ps.id}>
              <Phonebook name={ps.name} number={ps.number} />
              <button
                onClick={() => {
                  handleDeletePerson(ps);
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
