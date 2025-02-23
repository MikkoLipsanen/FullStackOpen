import { useQuery } from '@apollo/client'
import { GET_USER, GENRE_BOOKS } from '../queries'

const Recommendations = ({ show }) => {
    const user = useQuery(GET_USER, {
        pollInterval: 50
    })

    const favoriteGenre = user?.data?.me?.favoriteGenre ? user.data.me.favoriteGenre : null

    const genreBooks = useQuery(GENRE_BOOKS, {
        variables: { genre: favoriteGenre },
        skip: !favoriteGenre
    })

    if (!show || !genreBooks.data) {
        return null
    }

    return (
      <div>
        <h2>Recommendations</h2>
        <p>books in your favorite genre <b>{favoriteGenre}</b>:</p>
        <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genreBooks.data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )
  }

  export default Recommendations