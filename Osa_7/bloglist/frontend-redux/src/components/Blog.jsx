import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addLike, removeBlog, addComment } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleteBlog = (blog) => {
        dispatch(removeBlog(blog))
        navigate('/')
    }

    const handleComment = async (event) => {
        event.preventDefault()
        const text = event.target.comment.value
        event.target.comment.value = ''
        const comment = {
            text: text,
            blogId: blog.id
        }
        dispatch(addComment(comment))
    }
    
    if (!blog) {
        return null
    }
  
    return (
            <div>
                <h2>{blog.title} {blog.author}</h2>
                <a href={blog.url}>{blog.url}</a>
                <p>
                    likes {blog.likes}{' '}
                    <button onClick={() => dispatch(addLike(blog))}>like</button>
                </p>
                <p>added by {blog.user.name}</p>
                {user.name === blog.user.name ? (
                    <button onClick={() => deleteBlog(blog)}>remove</button>
                ) : null}
                <h3>Comments</h3>
                <form onSubmit={handleComment}>
                    <div>
                        <input name="comment" />
                    </div>
                    <button type="submit">Add comment</button>
                </form>
                <ul>
                    {blog.comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
            </div>
    )
}

export default Blog