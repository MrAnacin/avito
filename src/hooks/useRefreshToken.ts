/**
 *  Returns a function for access_token updating (using refresh token) and sets it in cookies and store
 */

import { useCookies } from 'react-cookie'

import { useRefreshTokenMutation } from '../services/authApi'
import { setToken } from '../store/tokenSlice'
import { UserTokensRequest } from '../types'
import { useAppDispatch } from './useAppDispatch'

export const useRefreshToken = () => {
  const [, setCookies] = useCookies(['access', 'refresh'])

  const [doRefreshToken] = useRefreshTokenMutation()
  const dispatch = useAppDispatch()

  const handleRefreshToken = async (tokens: UserTokensRequest) => {
    try {
      const { access_token, refresh_token } = await doRefreshToken(
        tokens
      ).unwrap()

      setCookies('access', access_token)
      setCookies('refresh', refresh_token)

      dispatch(
        setToken({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
        })
      )

      return { access_token, refresh_token }
    } catch (err) {
      console.log('error refreshing tokens')
      return { error: err }
    }
  }

  return handleRefreshToken
}
