import Country from './Country'


const Countries = ({ countriesToShow, setCountryFilter }) => {

    if (countriesToShow.length > 10) {
        return (
            <p>
                Too many matches, specify another filter
            </p>
        )
    }

    else if (countriesToShow.length < 10 && countriesToShow.length > 1) {
        return (
            <div>
                {countriesToShow.map(country => 
                <p key={country.name.common}>
                    {country.name.common}
                    <button onClick={() => setCountryFilter(country.name.common)}> show </button>
                </p>)}
            </div>
        )
    }

    else if (countriesToShow.length === 1)  {
        return (
            <div>
                <Country country={countriesToShow[0]} />
            </div>
        )
    }
}
    
    
export default Countries