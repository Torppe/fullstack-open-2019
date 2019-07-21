import React from 'react';

const Course = ({course}) => {
  return (
    <div>
        <Header course = {course} />
        <Content parts = {course.parts} />
        <Total parts = {course.parts} />
    </div>
  )
}

const Header = (props) => {
  return (
      <>
          <h1>{props.course.name}</h1>
      </>
  )
}

const Content = ({parts}) => {
  const rows = () => parts.map(part =>
    <Part key={part.id} part={part}/>
  )

  return (
      <>
        {rows()}
      </>
  )
}

const Part = (props) => {
  return (
      <>
          <p> 
              {props.part.name} {props.part.exercises}
          </p> 
      </>
  )
}

const Total = ({parts}) => {
  const sum = parts.reduce((acc, part) => acc + part.exercises,0);

  return (
      <>
         <h3>Number of exercises {sum}</h3> 
      </>
  )

}

export default Course;