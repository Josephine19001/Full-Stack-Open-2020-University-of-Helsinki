import React from 'react';


const Phonebook = ({ name, number}) => {
  return (
    <li>{name}: {number}</li>
  )
}

export default Phonebook;