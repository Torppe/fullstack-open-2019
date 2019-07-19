import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const setSelectedToValue = (newValue) => {
    setSelected(newValue)
  }

  const voteAnecdote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const getMostVoted = () => {
    return anecdotes[points.indexOf(getMostPoints())]
  }

  const getMostPoints = () => {
    return Math.max(...points)
  }

  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  return (
    <div>
      <Header value="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} points={points[selected]}/>
      <div>
        <button onClick={() => voteAnecdote()}>Vote</button>
        <button onClick={() => setSelectedToValue(getRandomInteger(0,anecdotes.length - 1))}>
          Next anecdote
        </button>
      </div>
      <Header value="Anecdote with most votes" />
      <Anecdote anecdote={getMostVoted()} points={getMostPoints()}/>
    </div>
  )
}

const Anecdote = (props) => {

  return (
    <div>
      <div>{props.anecdote}</div>
      <div>has {props.points} votes</div>
    </div>
  )
}

const Header = props => <h1>{props.value}</h1>

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes}/>,
  document.getElementById('root')
)