import React from 'react';

const Course = ({course}) => {
  return (
    <div>
        <Header course = {course} />
        <Content parts = {course.parts} />
        {/* <Total parts = {course.parts} /> */}
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

// const Total = (props) => {
//   const sum = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises;

//   return (
//       <>
//          <p>Number of exercises {sum}</p> 
//       </>
//   )

// }

export default Course;