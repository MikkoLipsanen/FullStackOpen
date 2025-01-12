import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
    const [weatherData, setWeatherData] = useState([])

    useEffect(() => {
        axios
        .get(`https://api.open-meteo.com/v1/forecast?latitude=${country.capitalInfo.latlng[0]}&longitude=${country.capitalInfo.latlng[1]}&current=temperature_2m,wind_speed_10m`)
        .then(response => {
            setWeatherData(response.data)
        })
    }, [country])

    if (weatherData.current !== undefined) {
        return (
            <div>
                <h1>Weather in {country.capital[0]}</h1>
                <p>temperature {weatherData.current.temperature_2m} {weatherData.current_units.temperature_2m}</p>
                <p>wind {weatherData.current.wind_speed_10m} {weatherData.current_units.wind_speed_10m}</p>
            </div>
        )}
    else {
        return null
    } 
}

export default Weather