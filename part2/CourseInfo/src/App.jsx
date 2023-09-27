import Course from './components/Course'

const App = () => {
  const course = [
    {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {course.map(cours =>
      <div key={cours.id} >
        <Course course={cours} />
        <b>total of {cours.parts.reduce((a, b) => a + b.exercises, 0)} exercises</b>
      </div>
      )}
    </div>
  )
}

export default App