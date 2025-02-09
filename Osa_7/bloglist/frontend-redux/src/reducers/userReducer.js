import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { createTimedNotification } from './notificationReducer'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
    },
})

export const loginUser = (credentials) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login(credentials)
            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            dispatch(setUser(user))
        } catch (exception) {
            dispatch(
                createTimedNotification({
                    message: 'wrong username or password',
                    type: 'error',
                })
            )
        }
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        window.localStorage.removeItem('loggedBlogappUser')
        console.log('logout')
        dispatch(setUser(null))
    }
}

export const addUser = () => {
    return (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch(setUser(user))
        }
    }
}

export const { setUser } = userSlice.actions

export default userSlice.reducer
