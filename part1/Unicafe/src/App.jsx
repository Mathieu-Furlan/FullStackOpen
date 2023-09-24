import { useState } from 'react'

const Statistics = (props) => {
  return (
    <div>
      {props.text}{props.stat}
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
      <Statistics text='good ' stat={good} />
      <Statistics text='neutral ' stat={neutral} />
      <Statistics text='bad ' stat={bad} />
      <Statistics text='all ' stat={good + neutral + bad} />
      <Statistics text='average ' stat={(good - bad) / (good + neutral + bad)} />
      <Statistics text='positive ' stat={((good / (good + neutral + bad)) * 100)+ "%"} />
    </div>
  )
}

export default App