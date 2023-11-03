import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../types'

const initialState: Product[] = []

export const productsSlice = createSlice({
  name: 'filteredProducts',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) =>
      (state = action.payload),
  },
})

export const { setProducts } = productsSlice.actions

export default productsSlice.reducer
