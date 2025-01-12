import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = props => <div>{props.text} {props.value}</div>

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        no feedback given
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text={"good"} value={props.good} />
      <StatisticLine text={"neutral"} value={props.neutral} />
      <StatisticLine text={"bad"} value={props.bad} />
      <StatisticLine text={"all"} value={props.all} />
      <StatisticLine text={"average"} value={props.average} />
      <StatisticLine text={"positive"} value={props.positive.toString() + "%"} />
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleButton = (state, setter, value) => () => {
    setter(state + 1)
    setAll(allClicks.concat(value))
  }

  const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleButton(good, setGood, 1)} text='good' />
      <Button handleClick={handleButton(neutral, setNeutral, 0)} text='neutral' />
      <Button handleClick={handleButton(bad, setBad, -1)} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={good+neutral+bad} average={average(allClicks)} positive={(good / (good+neutral+bad) * 100)} />
    </div>
  )
}

export default App