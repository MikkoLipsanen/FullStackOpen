import { useState, useEffect } from 'react';
import axios from 'axios';
import { Weather, Visibility, DiaryEntry } from "./types";
import { getAllEntries, createEntry } from './services/diaries';

interface ErrorProps {
  errorMessage: string;
}

const Notify = ( props: ErrorProps ) => {
  if ( !props.errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {props.errorMessage}
    </div>
  )
}


const App = () => {
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState<Visibility>(Visibility.Great);
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Sunny);
  const [newComment, setNewComment] = useState('');
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState('');

  console.log(newDate)
  
  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  }, [])

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createEntry(
      { 
        date: newDate,
        visibility: newVisibility,
        weather: newWeather,
        comment: newComment 
      }
    ).then(data => {
      setEntries(entries.concat(data))
    })
    .catch (error => {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data);
        setTimeout(() => {
          setError('')
        }, 10000)
        console.log(error.response?.data);
      } else {
        console.log(error);
      }
    })
    setNewDate('')
    setNewVisibility(Visibility.Great)
    setNewWeather(Weather.Sunny)
    setNewComment('')
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notify errorMessage={error} />
      <form onSubmit={entryCreation}>
        <div>
          date
          <input
            type="date"
            value={newDate}
            onChange={(event) => setNewDate(event.target.value)} 
          />
        </div>
        <div>
          visibility
          <input type="radio" id="great" name="visibility" value="great" onChange={() => setNewVisibility(Visibility.Great)} defaultChecked />
          <label htmlFor="great">great</label>

          <input type="radio" id="good" name="visibility" value="good" onChange={() => setNewVisibility(Visibility.Good)} />
          <label htmlFor="good">good</label>

          <input type="radio" id="ok" name="visibility" value="ok" onChange={() => setNewVisibility(Visibility.Ok)} />
          <label htmlFor="ok">ok</label>

          <input type="radio" id="poor" name="visibility" value="poor"  onChange={() => setNewVisibility(Visibility.Poor)} />
          <label htmlFor="poor">poor</label>
        </div>
        <div>
          weather
          <input type="radio" id="sunny" name="weather" value="sunny" onChange={() => setNewWeather(Weather.Sunny)} defaultChecked />
          <label htmlFor="sunny">sunny</label>

          <input type="radio" id="rainy" name="weather" value="rainy" onChange={() => setNewWeather(Weather.Rainy)} />
          <label htmlFor="rainy">rainy</label>

          <input type="radio" id="cloudy" name="weather" value="cloudy" onChange={() => setNewWeather(Weather.Cloudy)} />
          <label htmlFor="cloudy">cloudy</label>

          <input type="radio" id="stormy" name="weather" value="stormy" onChange={() => setNewWeather(Weather.Stormy)} />
          <label htmlFor="stormy">stormy</label>

          <input type="radio" id="windy" name="weather" value="windy" onChange={() => setNewWeather(Weather.Windy)} />
          <label htmlFor="windy">windy</label>
        </div>
        <div>
          comment
          <input
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)} 
          />
        </div>
        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      <div>
        {entries.map(entry =>
        <div key={entry.id}>
          <p><b>{entry.date}</b></p>
          <p>visibility: {entry.visibility}</p>
          <p>weather: {entry.weather}</p>
          <p>comment: {entry.comment}</p>
        </div>
        )}
      </div>
    </div>
  )
}
export default App