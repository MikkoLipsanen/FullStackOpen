import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {},
    reducers: {
        addNotification(state, action) {
            return action.payload
        },
    },
})

export const createTimedNotification = (content) => {
    return (dispatch) => {
        dispatch(addNotification(content))
        setTimeout(() => {
            dispatch(addNotification({}))
        }, 5000)
    }
}

export const { addNotification } = notificationSlice.actions

export default notificationSlice.reducer
