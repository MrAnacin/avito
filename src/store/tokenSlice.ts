import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserTokensRequest } from '../types'

const initialState: UserTokensRequest = {
  access_token: undefined,
  refresh_token: undefined,
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<UserTokensRequest>) => {
      state.access_token = action.payload.access_token
      state.refresh_token = action.payload.refresh_token
    },
  },
})

export const { setToken } = tokenSlice.actions

export default tokenSlice.reducer
