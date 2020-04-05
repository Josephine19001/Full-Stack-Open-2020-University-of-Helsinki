import React, { useState } from 'react';
import Name from "./components/Name"


const App = (props) => {

  const [persons, setPersons] = useState(props.persons);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault(); 

    
    for(let person of persons){
      if(person.name === newName){
        alert(`${newName} is already added to phonebook`);
      }else if(persons.length === 0){
        setPersons([...persons, {name:newName, id:persons.length +1}]);
          setNewName('');
      }
    }
   
  
   
  }

  
  const handlePersonChange = (event) =>{
    const {value} = event.target;
  
    console.log(value);
    setNewName(value);
    
  }

  return (
    <div>
     <h2>Phonebook</h2>
     <form onSubmit={addPerson}>
         <div >
        name :
         <input 
           value={newName}
           onChange={handlePersonChange}
         /> 
         </div>
         <button type="submit">
         add
         </button>
       
     </form>
     <h2>Numbers</h2>
     <ul>
        {persons.map((person, i) =>
         <Name key={i} person={person} />
        )
        }
      </ul>
    </div>
  );
}

export default App;
