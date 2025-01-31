import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const blogFormRef = useRef()

  const sortBlogs = blogs => {
    const sorted = [...blogs].sort((a, b) => b.likes - a.likes)
    return sorted
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogs(blogs))
    )
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(sortBlogs(blogs.concat(returnedBlog)))
        console.log(JSON.stringify(returnedBlog))
        setMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author.name} added`)
        setMessageType('notification')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const addLike = blog => {
    const updatedBlog = { ...blog, user: blog.user._id, likes: blog.likes + 1 }
    blogService
      .update(blog.id, updatedBlog)
      .then(returnedBlog => {
        returnedBlog.user = blog.user
        setBlogs(sortBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog)))
      })
  }

  const removeBlog = blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService
        .deleteBlog(blog.id)
        .then(response => {
          setBlogs(sortBlogs(blogs.filter(b => b.id !== blog.id)))
          setMessage(
            `Deleted ${blog.title}`
          )
          setMessageType('notification')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
        })
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} messageType={messageType}/>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              data-testid='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-testid='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} messageType={messageType}/>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={() => handleLogout()}>logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />
      )}
      <h2>create new</h2>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </div>
  )

}

export default App