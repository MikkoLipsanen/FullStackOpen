import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationChange(state, action) {
            return action.payload
        }
    }
})

export const { notificationChange } = notificationSlice.actions

export const setNotification = (text, time) => {
  return async dispatch => {
    dispatch(notificationChange(text))
    setTimeout(() => {
        dispatch(notificationChange(''))
      }, time)
  }
}

export default notificationSlice.reducer