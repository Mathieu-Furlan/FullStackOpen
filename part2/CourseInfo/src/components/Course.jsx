const Course = (props) => {
  const courses = props.course.parts
  return (
    <div>
      <h2>{props.course.name}</h2>
        {courses.map(course => 
          <p key={course.id}>
            {course.name} {course.exercises}
          </p>
        )}
    </div>
  )
}

export default Course