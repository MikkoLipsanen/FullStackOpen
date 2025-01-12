const Header = ({name}) => {
    return (
      <div>
        <h2>{name}</h2>
      </div>
    )
}
  
const Part = ({name, exercises}) => {
    return (
      <div>
        <p>
          {name} {exercises}
        </p>
      </div>
    )
}
  
const Content = ({parts}) => {
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
    )
}
  
const Total = ({parts}) => {

    const total = (parts) =>{
      const initialValue = 0
      const sum = parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises, 
        initialValue,
      )
      return sum
  
    }
    return (
      <b>
        total of {total(parts)} exercises
      </b>
    )
}
  
const Course = ({course}) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
}

export default Course

