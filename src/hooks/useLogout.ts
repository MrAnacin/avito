import { useCookies } from 'react-cookie'

import { useAppDispatch } from './useAppDispatch'
import { setToken } from '../store/tokenSlice'

export const useLogout = () => {
  const [, , removeCookies] = useCookies(['access', 'refresh'])
  const dispatch = useAppDispatch()

  const logout = () => {
    removeCookies('access')
    removeCookies('refresh')
    dispatch(setToken({ access_token: undefined, refresh_token: undefined }))
  }

  return logout
}
