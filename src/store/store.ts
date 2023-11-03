import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import { authApi } from '../services/authApi'
import tokenReducer from './tokenSlice'
import currentUserReducer from './currentUserSlice'
import queryReducer from './filteredProductsSlice'
import productsReducer from './productsSlice'
import { productsApi } from '../services/productsApi'
import { usersApi } from '../services/usersApi'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    currentUser: currentUserReducer,
    query: queryReducer,
    products: productsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(productsApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
