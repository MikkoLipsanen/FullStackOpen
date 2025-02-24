import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from '../queries'

const Authors = ({ setError, show }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const authors = useQuery(ALL_AUTHORS)
  const authorsWithoutBirthyear = authors?.data?.allAuthors ? authors.data.allAuthors.filter(a => a.born === null) : null

  const [ changeBirthyear ] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      setError(messages)
    }
  })
  if (!show || !authors?.data?.allAuthors ) {
    return null
  }

  if (authors.loading)  {
    return <div>loading...</div>
  }

  const submit = async (event) => {
    event.preventDefault()
    const authorName = name === '' ? authorsWithoutBirthyear[0].name : name
    changeBirthyear({  variables: { authorName, born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.books.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {authorsWithoutBirthyear.map((a) => (
            <option key={a.name} value={a.name}>{a.name}</option>
          ))}
        </select>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  )
}

export default Authors
