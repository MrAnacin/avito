import { ERRORS } from '../constants'
import { AuthError } from '../types'

export const getErrorMessage = (error: AuthError) => {
  if (!('data' in error)) return 'Что-то пошло не так...'

  const errData = error.data
  const errorFromApi = errData.detail || errData.details || ''

  if (errorFromApi in ERRORS) return ERRORS[errorFromApi]

  if (errorFromApi.includes('UNIQUE constraint failed'))
    return 'Этот e-mail занят'

  return errorFromApi
}
