import { useCookies } from 'react-cookie'

import { useAppDispatch } from './useAppDispatch'
import { setToken } from '../store/tokenSlice'

export const useLoadCredentialsFromCookies = () => {
  const [cookies] = useCookies(['access', 'refresh'])
  const dispatch = useAppDispatch()

  if (cookies && cookies.access) {
    dispatch(
      setToken({ access_token: cookies.access, refresh_token: cookies.refresh })
    )
    return true
  }

  return false
}
