import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

import PropTypes from 'prop-types';

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
  </div>
  )
}

const sortAnecdotes = anecdotes => {
  const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes)
  return sorted
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if ( filter === '' ) {
      return sortAnecdotes(anecdotes)
    }
    return sortAnecdotes(anecdotes.filter(anecdote => anecdote.content.toUpperCase().includes(filter.toUpperCase())))
  })

  const addVote = anecdote => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(notificationChange(`You voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(notificationChange(''))
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            addVote(anecdote)
          }
        />
      )}
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
  handleClick: PropTypes.func.isRequired,
}

export default AnecdoteList