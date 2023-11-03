import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from '../constants'
import { RootState } from '../store/store'
import {
  Credentials,
  User,
  UserTokensResponse,
  UserTokensRequest,
} from '../types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.access_token
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (build) => ({
    login: build.mutation<UserTokensResponse, Credentials>({
      query: (body: Credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
    }),
    register: build.mutation<User, Credentials>({
      query: (body: Credentials) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
    refreshToken: build.mutation<UserTokensResponse, UserTokensRequest>({
      query: (body: UserTokensRequest) => ({
        url: 'auth/login',
        method: 'PUT',
        body,
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
} = authApi
