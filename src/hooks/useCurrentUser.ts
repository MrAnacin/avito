/**
 * Returns the current user, refreshing his token if necessary
 * Returns undefined if no logged in user or the refresh token is invalid
 * Property 'setIsOpened' is if for LoginModal
 */

import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router-dom'

import { SCREEN_SIZE } from '../constants'
import { ROUTES } from '../routes'
import { useGetCurrentUserQuery } from '../services/usersApi'
import { tokensSelector } from '../store/selectors/tokens'
import { UserTokensRequest } from '../types'
import { useAppSelector } from './useAppDispatch'
import { useRefreshToken } from './useRefreshToken'

export const useCurrentUser = (setIsOpened?: Function) => {
  const timestamp = useRef(Date.now()).current
  const { data, isLoading, isError, error } = useGetCurrentUserQuery(timestamp)

  const doRefreshToken = useRefreshToken()
  const oldTokens = useAppSelector(tokensSelector)
  const navigate = useNavigate()

  const [resultError, setResultError] = useState(false)

  const isDesktop = useMediaQuery({
    query: SCREEN_SIZE.desktop,
  })
  const isMobile = useMediaQuery({ query: SCREEN_SIZE.mobile })

  const handleRefreshToken = async (tokens: UserTokensRequest) => {
    const newTokens = await doRefreshToken(tokens)

    if ('error' in newTokens && setIsOpened && isDesktop) {
      setIsOpened(true)
    }

    if ('error' in newTokens && isMobile) {
      navigate(ROUTES.login)
    }
  }

  const shouldRefreshTokens = error
    ? 'status' in error && error.status === 401
    : false

  useEffect(() => {
    if (isError) {
      if (
        shouldRefreshTokens &&
        oldTokens.access_token &&
        oldTokens.refresh_token
      ) {
        setResultError(false)
        handleRefreshToken(oldTokens)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, oldTokens.access_token, oldTokens.refresh_token])

  return { user: data, isLoading, isError, error: resultError }
}
