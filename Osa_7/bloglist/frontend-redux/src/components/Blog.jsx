import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addLike, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleteBlog = (blog) => {
        dispatch(removeBlog(blog))
        navigate('/')
    }
    
    if (!blog) {
        return null
    }
  
    return (
        <div>
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
            </div>
        </div>
    )
}

export default Blog