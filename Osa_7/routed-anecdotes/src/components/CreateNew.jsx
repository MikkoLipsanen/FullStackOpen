import  { useField } from '../hooks'
import { useNavigate } from 'react-router-dom'

const CreateNew = (props) => {
    const navigate = useNavigate()

    const removeReset = object => {
        const {reset, ...newObject} = object
        return newObject
    }

    const content = useField('content')
    const author = useField('author')
    const info = useField('info')

    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })
      navigate('/')
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input {...removeReset(content)} />
          </div>
          <div>
            author
            <input {...removeReset(author)} />
          </div>
          <div>
            url for more info
            <input {...removeReset(info)} />
          </div>
          <button>create</button> 
        </form>
        <button onClick={content.reset}>reset</button>
      </div>
    )
}

export default CreateNew