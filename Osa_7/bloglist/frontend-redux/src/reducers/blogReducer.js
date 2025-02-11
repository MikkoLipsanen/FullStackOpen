import { createSlice } from '@reduxjs/toolkit'
import { createTimedNotification } from './notificationReducer'
import { initializeUsers } from './usersReducer'
import blogService from '../services/blogs'

const sortBlogs = (blogs) => {
    const sorted = [...blogs].sort((a, b) => b.likes - a.likes)
    return sorted
}

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        replaceBlog(state, action) {
            const updatedBlog = action.payload
            const newState = state.map((blog) =>
                blog.id !== updatedBlog.id ? blog : updatedBlog
            )
            return sortBlogs(newState)
        },
        deleteBlog(state, action) {
            const id = action.payload
            const newState = state.filter((blog) => blog.id !== id)
            return sortBlogs(newState)
        },
    },
})

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(sortBlogs(blogs)))
    }
}

export const createBlog = (content, user) => {
    return async (dispatch) => {
        const newBlog = await blogService.createNew(content)
        const appendedBlog = {...newBlog, user:
            {
                id: newBlog.user,
                username: user.user.username,
                name: user.user.name
            }
        }
        dispatch(appendBlog(appendedBlog))
        dispatch(initializeUsers())
        dispatch(
            createTimedNotification({
                message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
                type: 'notification',
            })
        )
    }
}

export const removeBlog = (blog) => {
    return async (dispatch) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            const deletedBlog = await blogService.deleteBlog(blog.id)
            dispatch(deleteBlog(blog.id))
            dispatch(
                createTimedNotification({
                    message: `Deleted ${blog.title}`,
                    type: 'notification',
                })
            )
        }
    }
}

export const addLike = (blog) => {
    return async (dispatch) => {
        const changedBlog = {
            ...blog,
            user: blog.user._id,
            likes: blog.likes + 1,
        }
        const updatedBlog = await blogService.updateBlog(changedBlog)
        updatedBlog.user = blog.user
        dispatch(replaceBlog(updatedBlog))
    }
}

export const addComment = (comment) => {
    return async (dispatch) => {
        const updatedBlog = await blogService.addComment(comment)
        dispatch(replaceBlog(updatedBlog))
    }
}

export const { appendBlog, setBlogs, replaceBlog, deleteBlog } =
    blogSlice.actions

export default blogSlice.reducer
