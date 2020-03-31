import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

function App(){
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises;
  return (
    <div>
      <Header courseName={course.name}/>
      <Content 
        part = {course.parts[0].name}
        exercises={course.parts[0].exercises}
      />
      <Content 
        part = {course.parts[1].name}
        exercises={course.parts[1].exercises}
      />
      <Content 
        part = {course.parts[2].name}
        exercises={course.parts[2].exercises}
      />
      <Total 
        sum={sum}
      />
    </div>
  );
}

export default App;