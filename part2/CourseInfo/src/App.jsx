const Course = (props) => {
  const courses = props.course.parts
  return (
    <div>
      <h1>Half Stack application development</h1>
        {courses.map(course => 
          <p key={course.id}>
            {course.name} {course.exercises}
          </p>
        )}
    </div>
  )
}

const App = () => {
  const course = {
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
  }

  return (
    <div>
      <Course course={course} />
      <b>total of {course.parts.reduce((a, b) => a + b.exercises, 0)} exercises</b>
    </div>
  )
}

export default App