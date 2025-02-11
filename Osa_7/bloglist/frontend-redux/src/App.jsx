import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Header from './components/Header'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { initializeBlogs } from './reducers/blogReducer'
import { addUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
    const padding = {
        padding: 5
    }

    const dispatch = useDispatch()

    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(addUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    const loggedUser = useSelector((state) => state.user)
    const users = useSelector((state) => state.users)
    const blogs = useSelector((state) => state.blogs)
    
    const userMatch = useMatch('/users/:id')
    const user = userMatch 
        ? users.find(user => user.id === userMatch.params.id)
        : null

    const blogMatch = useMatch('/blogs/:id')
    const blog = blogMatch 
        ? blogs.find(blog => blog.id === blogMatch.params.id)
        : null

    return (
        <div>
            <div> 
                <Notification />
                {!loggedUser ?
                    <LoginForm />
                :
                    <div>
                        <div>
                            <Link style={padding} to="/">blogs</Link>
                            <Link style={padding} to="/users">users</Link>
                            <Header user={loggedUser} />
                        </div>

                        <Routes>
                            <Route path="/users/:id" element={<User user={user} />} />
                            <Route path="/users" element={<Users users={users} />} />
                            <Route path="/blogs/:id" element={<Blog blog={blog} user={loggedUser} />} />
                            <Route path="/" element={
                                <div>
                                    <Togglable buttonLabel="new blog" ref={blogFormRef}>
                                        <BlogForm user={loggedUser} />
                                    </Togglable>
                                    <Blogs blogs={blogs} />
                                </div>  
                            } /> 
                        </Routes>
                    </div>
                }
            </div>  
        </div>
    )
}

export default App
