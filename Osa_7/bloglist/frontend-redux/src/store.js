import { configureStore } from '@reduxjs/toolkit'

import noteReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer: {
        notification: noteReducer,
        blogs: blogReducer,
        user: userReducer,
    },
})

export default store
