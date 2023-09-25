import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <div>
      {props.text}{props.value}
    </div>
  )
}

const Statistics = ({bien, neutre, mauvais, clicked}) => {
  if(clicked > 0){
    return (
      <div>
        <StatisticLine text="good " value={bien}/>
        <StatisticLine text="neutral " value={neutre}/>
        <StatisticLine text="bad " value={mauvais}/>
        <StatisticLine text="all " value={clicked}/>
        <StatisticLine text="average " value={bien - mauvais / clicked}/>
        <StatisticLine text="positive " value={((bien / clicked) * 100) + "%"}/>
      </div>
    )
  }
  return (
    <div>
      No feedback given
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleCLick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const augmBien = () => setGood(good + 1)
  const augmNeutre = () => setNeutral(neutral + 1)
  const augmMauvais = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button 
        handleCLick = {augmBien} 
        text = 'good'
      />
      <Button 
        handleCLick = {augmNeutre} 
        text = 'neutral'
      />
      <Button 
        handleCLick = {augmMauvais} 
        text = 'mauvais'
      />
      <h1>Statistics</h1>
      <Statistics bien={good} neutre={neutral} mauvais={bad} clicked={good + neutral + bad} />
    </div>
  )
}

export default App