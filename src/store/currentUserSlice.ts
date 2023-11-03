import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '../types'

const initialState: User = {}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) =>
      (state = { ...action.payload }),
    updateCurrentUser: (state, action: PayloadAction<User>) => {
      return (state = {
        ...state,
        ...action.payload,
      })
    },
  },
})

export const { setCurrentUser, updateCurrentUser } = currentUserSlice.actions

export default currentUserSlice.reducer
