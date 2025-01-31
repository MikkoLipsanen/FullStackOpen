import { useState } from 'react'
import PropTypes from 'prop-types'

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
    marginBottom: 5
  }

  return (
    <div data-testid='blog-content' style={blogStyle}>
      <div data-testid='visible-content' className='visibleContent' style={hideWhenVisible}>
        <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>view</button></p>
      </div>
      <div data-testid='togglable-content' className='togglableContent' style={showWhenVisible}>
        <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={() => addLike(blog)}>like</button></p>
        <p>{blog.user.name}</p>
        {user.name === blog.user.name ? <button onClick={() => removeBlog(blog)}>remove</button>: null}
      </div>
    </div>

  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog