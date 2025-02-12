import { useDispatch } from 'react-redux'
import {
    TextField,
    Button
} from '@mui/material'
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
                <TextField name="title" label="Title" />
            </div>
            <br></br>
            <div>
                <TextField name="author" label="Author" />
            </div>
            <br></br>
            <div>
                <TextField name="url" label="Url" />
            </div>
            <br></br>
            <div>
                <Button variant="contained" color="primary" type="create">
                    Add
                </Button>
            </div>
        </form>
    )
}

export default BlogForm
