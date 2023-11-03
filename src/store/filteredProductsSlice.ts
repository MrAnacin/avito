import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: string = ''

export const querySlice = createSlice({
  name: 'query',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) =>
      (state = action.payload),
  },
})

export const { setQuery } = querySlice.actions

export default querySlice.reducer
