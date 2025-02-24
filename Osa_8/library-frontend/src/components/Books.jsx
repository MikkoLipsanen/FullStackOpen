import { useQuery } from '@apollo/client'
import { useState } from "react";
import { ALL_BOOKS } from '../queries'


const Books = ({ show }) => {
  const [genre, setGenre] = useState("all")
  const books = useQuery(ALL_BOOKS)

  if (!show) {
    return null
  }

  if (books.loading)  {
    return <div>loading...</div>
  }

  const genres = [...new Set(books.data.allBooks.map(b => b.genres).flat()), "all"]
  const genreBooks = genre === "all" ? books.data.allBooks : books.data.allBooks.filter(book => book.genres.includes(genre))

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genreBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map(genre => (
          <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
        ))}
      </div>
      
    </div>
  )
}

export default Books
