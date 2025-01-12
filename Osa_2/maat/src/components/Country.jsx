import Weather from './Weather'

const Country = ({ country }) => {
    if (country.name && country.languages && country.flags) {
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>
                <b>languages:</b>
                <ul>
                    {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
                </ul>
                <img src={country.flags.png}></img>
                <Weather country={country} />  
            </div>
        )
    } else {
        return null
    }
}

export default Country
