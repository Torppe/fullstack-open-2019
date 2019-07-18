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

const Statistics = ({good, neutral, bad}) => {
  const sum = good + neutral + bad
  const average = sum / 3
  const positive = (good / sum) * 100 + " %"

  if(sum === 0){
    return (
      <div>No feedback given</div>
    )
  } else {
    return (
      <table>
        <tbody>
          <Statistic text="Good" value={good}/>
          <Statistic text="Neutral" value={neutral}/>
          <Statistic text="Bad" value={bad}/>
          <Statistic text="All" value={sum}/>
          <Statistic text="Average" value={average}/>
          <Statistic text="Positive" value={positive}/>
        </tbody>
      </table>
    )
  }
}
const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td> 
    </tr>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)