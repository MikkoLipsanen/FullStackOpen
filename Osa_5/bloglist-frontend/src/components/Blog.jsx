import { useState } from 'react'

const Blog = ({ blog }) => {
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
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>view</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    </div> 

)}

export default Blog