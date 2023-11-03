import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import { ROUTES } from '../../routes'
import { Button } from '../Button/Button'
import { Logo } from '../Logo/Logo'
import { setQuery } from '../../store/filteredProductsSlice'
import { querySelector } from '../../store/selectors/querySelector'

import styles from './style.module.css'

export const SearchBar: FC = () => {
  const dispatch = useAppDispatch()

  const storeQuery = useAppSelector(querySelector)

  const [newQuery, setNewQuery] = useState<string>(storeQuery || '')

  useEffect(() => {
    return () => {
      dispatch(setQuery(''))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuery(e.target.value)
    if (e.target.value === '') {
      dispatch(setQuery(''))
    }
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    window.scrollTo(0, 0)

    dispatch(setQuery(newQuery))
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Link to={ROUTES.main} className={styles.link}>
        <div className={styles.logoWrapper}>
          <Logo />
        </div>
      </Link>
      <input
        className={styles.input}
        placeholder="Поиск по объявлениям"
        type="search"
        value={newQuery}
        onChange={handleChange}
      />
      <div className={styles.buttonWrapper}>
        <Button btnType="submit">Найти</Button>
      </div>
    </form>
  )
}
