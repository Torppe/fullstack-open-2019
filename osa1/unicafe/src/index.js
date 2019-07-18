import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodToValue = (newValue) => {
    setGood(newValue)
  }

  const setNeutralToValue = (newValue) => {
    setNeutral(newValue)
  }

  const setBadToValue = (newValue) => {
    setBad(newValue)
  }

  return (
    <div>
      <Header text="Give feedback" />
      <Button handleClick={() => setGoodToValue(good + 1)} text="Good"/>
      <Button handleClick={() => setNeutralToValue(neutral + 1)} text="Neutral"/>
      <Button handleClick={() => setBadToValue(bad + 1)} text="Bad"/>
      <Header text="Statistics" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Header = props => <h1>{props.text}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Statistics = (props) => {
  return (
    <>
      <div>Good {props.good}</div>
      <div>Neutral {props.neutral}</div>
      <div>Bad {props.bad}</div>
    </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)