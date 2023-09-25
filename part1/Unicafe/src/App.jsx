import { useState } from 'react'

const Statistics = ({bien, neutre, mauvais, clicked, clicks}) => {
  if(clicked > 0){
    return (
      <div>
        <p>{clicks[0]}{bien}</p>
        <p>{clicks[1]}{neutre}</p>
        <p>{clicks[2]}{mauvais}</p>
        <p>{clicks[3]}{clicked}</p>
        <p>{clicks[4]}{bien - mauvais / clicked}</p>
        <p>{clicks[5]}{((bien / clicked) * 100) + "%"}</p>
      </div>
    )
  }
  return (
    <div>
      No feedback given
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const clicks = [
    'good ',
    'neutral ',
    'bad ',
    'all ',
    'average ',
    'positive '
  ]

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={() => {
        setGood(good + 1)
        }}>
        good
      </button>
      <button onClick={() => {
        setNeutral(neutral + 1)
        }}>
        neutral
      </button>
      <button onClick={() => {
        setBad(bad + 1)
        }}>
        bad
      </button>
      <h1>Statistics</h1>
      <Statistics bien={good} neutre={neutral} mauvais={bad} clicked={good + neutral + bad} clicks={clicks} />
    </div>
  )
}

export default App