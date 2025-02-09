import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = (user) => {
    const dispatch = useDispatch()

    const addBlog = async (event) => {
        event.preventDefault()
        const title = event.target.title.value
        event.target.title.value = ''
        const author = event.target.author.value
        event.target.author.value = ''
        const url = event.target.url.value
        event.target.url.value = ''
        const newBlog = {
            title: title,
            author: author,
            url: url,
        }
        dispatch(createBlog(newBlog, user))
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                {' '}
                title: <input name="title" />
            </div>
            <div>
                {' '}
                author: <input name="author" />
            </div>
            <div>
                {' '}
                url: <input name="url" />
            </div>
            <div>
                <button type="create">add</button>
            </div>
        </form>
    )
}

export default BlogForm
