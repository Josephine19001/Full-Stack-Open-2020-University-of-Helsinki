import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) =>{
   const {handleClick,text} = props;
   return(
  <button onClick = {handleClick}>
    {text}
  </button>
  )
}
const Anecdote = (props) =>{
  const {title, text,index,points} = props;
  return(
  <div>
    <h1>{title}</h1>
    {anecdotes[index]}
    <p>has {points[index]} votes </p>
    {/* {points[index]} */}
  </div>
  )
}

//App component
const App = (props) => {
  const random = Math.floor(Math.random() * anecdotes.length);
  const selectedPoint = new Array(anecdotes.length +1).join('0').split('').map(parseFloat);
  const [selected, setSelected] = useState(random);
  const [points, setPoints] = useState(selectedPoint)


  function handleNext() {
    let nextSelect = selected;
    if(nextSelect === selected)
    {
      nextSelect = Math.floor(Math.random() * anecdotes.length);
    }
    
    setSelected(nextSelect);
    
  }
  const highestVotes = points.indexOf(Math.max(...points));
  function handleVotes() {
    let copyPoints = [...points]
    copyPoints[selected] += 1;
    setPoints(copyPoints)
  }

  return (
    <div>
    <Anecdote 
      title= "Anecdote for the day"
      index={selected}
      points={points}
    />
     <Button
      text="vote"
      handleClick = {handleVotes}
    />
    <Button
      text="next anecdote"
      handleClick = {handleNext}
    />
     <Anecdote 
      title= "Anecdote with most votes"
      index ={highestVotes}
      points={points}
    />
    
    </div>
  )
}

//Anecdote array
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

//App rendering
ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
);

