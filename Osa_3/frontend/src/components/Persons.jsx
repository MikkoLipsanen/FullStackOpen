import Person from './Person'

const Persons = (props) => {
    return (
        <div>
            {props.personsToShow.map(person => <Person key={person.id} person={person} removePerson={props.removePerson} />)}
        </div>
    )
}

export default Persons