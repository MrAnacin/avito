import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import { Button } from '../../components/Button/Button'
import { INCORRECT_EMAIL_WARNING, validPasswordLength } from '../../constants'
import { AuthError, FormData } from '../../types'
import { Modal } from '../Modal/Modal'
import { useLoginMutation } from '../../services/authApi'
import { ROUTES } from '../../routes'
import { getErrorMessage } from '../../utils/getErrorMessage'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { setToken } from '../../store/tokenSlice'
import { CrossIcon } from '../../components/CrossIcon/CrossIcon'
import { useLogout } from '../../hooks/useLogout'

import logo from './assets/skyLogo.svg'
import styles from './style.module.css'

const validEmail = new RegExp(/^[\w]{1}[\w-.]*@[\w-]+\.[a-z]{2,3}$/i)

type Props = {
  setIsOpened: Function
  setSignUpIsOpened: Function
}

export const LoginModal: FC<Props> = ({ setIsOpened, setSignUpIsOpened }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const logout = useLogout()

  const [login, { data: userTokens }] = useLoginMutation()

  const [isBlocked, setIsBlocked] = useState<boolean>(false)
  const [, setCookies] = useCookies(['access', 'refresh'])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (userTokens) {
      setCookies('access', userTokens.access_token)
      setCookies('refresh', userTokens.refresh_token)

      dispatch(
        setToken({
          access_token: userTokens.access_token,
          refresh_token: userTokens.refresh_token,
        })
      )
    }
    // eslint-disable-next-line
  }, [userTokens])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsBlocked(true)
    setError('')

    try {
      await login({ email: data.email, password: data.password }).unwrap()

      setIsOpened(false)
      navigate(ROUTES.profile)
    } catch (error) {
      console.log(error)
      setError(getErrorMessage(error as AuthError))
      setIsBlocked(false)
    }
  }

  const focusHandler = () => setError('')

  const handleSignUpClick = () => {
    setIsOpened(false)
    setSignUpIsOpened(true)
  }

  const inputPasswordStyle = classNames(styles.input, styles.inputPassword)

  return (
    <Modal isOpen={setIsOpened} handleEsc={logout}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        data-cy="login-modal"
      >
        <div
          className={styles.closeButton}
          onClick={() => {
            logout()
            setIsOpened(false)
          }}
        >
          <CrossIcon />
        </div>
        <img className={styles.logo} src={logo} alt="logo" />
        <div className={styles.inputs}>
          <input
            onFocus={focusHandler}
            className={styles.input}
            placeholder="E-mail"
            data-cy="login-email"
            {...register('email', {
              required: 'Введите e-mail',
              pattern: {
                value: validEmail,
                message: INCORRECT_EMAIL_WARNING,
              },
            })}
          />
          <p className={styles.error}>
            {errors.email && <span>{errors.email.message}</span>}
          </p>

          <input
            onFocus={focusHandler}
            className={inputPasswordStyle}
            placeholder="Пароль"
            type="password"
            data-cy="login-password"
            {...register('password', {
              required: 'Введите пароль',
              minLength: {
                value: validPasswordLength,
                message: `Пароль должен быть не менее ${validPasswordLength} символов`,
              },
            })}
          />
          <p className={styles.error}>
            {errors.password && <span>{errors.password.message}</span>}
          </p>
        </div>
        <p className={classNames(styles.error, styles.back)}>
          {error && <span>{error}</span>}
        </p>
        <div className={styles.buttons}>
          <Button
            buttonStatus={isBlocked ? 'disabled' : 'normal'}
            size="xxl"
            mb="20px"
            btnType="submit"
          >
            Войти
          </Button>
          <Button
            type="outlined"
            btnType="button"
            onClick={handleSignUpClick}
            buttonStatus={isBlocked ? 'disabled' : 'normal'}
            size="xxl"
          >
            Зарегистрироваться
          </Button>
        </div>
      </form>
    </Modal>
  )
}
