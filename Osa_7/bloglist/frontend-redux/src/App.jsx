import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { initializeBlogs } from './reducers/blogReducer'
import { addUser, logoutUser } from './reducers/userReducer'

const App = () => {
    const dispatch = useDispatch()

    const blogFormRef = useRef()

    useEffect(() => {
        dispatch(addUser())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    const user = useSelector((state) => state.user)

    return (
        <div>
            <Notification />
            {!user ? <LoginForm /> :
                <div>
                    <p>
                        {user.name} logged in{' '}
                        <button onClick={() => dispatch(logoutUser())}>logout</button>
                    </p>
                    <Blogs user={user} />
                    <h2>Create new</h2>
                    <Togglable buttonLabel="new blog" ref={blogFormRef}>
                        <BlogForm user={user} />
                    </Togglable>
                </div>
            }
        </div>
    )
}

export default App
