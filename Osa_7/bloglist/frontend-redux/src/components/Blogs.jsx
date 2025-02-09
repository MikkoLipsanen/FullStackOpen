import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, addLike, removeBlog, user }) => {
    const [allVisible, setAllVisible] = useState(false)

    const hideWhenVisible = { display: allVisible ? 'none' : '' }
    const showWhenVisible = { display: allVisible ? '' : 'none' }

    const toggleVisibility = () => {
        setAllVisible(!allVisible)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }
  
    return (
        <div style={blogStyle}>
            <div style={hideWhenVisible}>
                <p>
                    {blog.title} {blog.author}{' '}
                    <button onClick={toggleVisibility}>view</button>
                </p>
            </div>
            <div style={showWhenVisible}>
                <p>
                    {blog.title} {blog.author}{' '}
                    <button onClick={toggleVisibility}>hide</button>
                </p>
                <p>{blog.url}</p>
                <p>
                    likes {blog.likes}{' '}
                    <button onClick={() => addLike(blog)}>like</button>
                </p>
                <p>{blog.user.name}</p>
                {user.user.name === blog.user.name ? (
                    <button onClick={() => removeBlog(blog)}>remove</button>
                ) : null}
            </div>
        </div>
    )
}

const Blogs = (user) => {
    const dispatch = useDispatch()
    const blogs = useSelector((state) => state.blogs)

    return (
        <div>
            <h2>Blogs</h2>
            {blogs.map((blog) => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    addLike={() => dispatch(addLike(blog))}
                    removeBlog={() => dispatch(removeBlog(blog))}
                    user={user}
                />
            ))}
        </div>
    )
}

export default Blogs
