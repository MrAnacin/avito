import { FC } from 'react'
import { Link } from 'react-router-dom'

import { useCurrentUser } from '../../hooks/useCurrentUser'
import { ROUTES } from '../../routes'

import homeIcon from './assets/home.svg'
import plusIcon from './assets/plus.svg'
import profileIcon from './assets/profile.svg'

import styles from './style.module.css'

type Props = {
  isLoggedIn?: boolean
}

export const NavigationMobile: FC<Props> = ({ isLoggedIn }) => {
  useCurrentUser()

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.icons}>
          <Link to={ROUTES.main} className={styles.link}>
            <img className={styles.icon} src={homeIcon} alt="Home" />
          </Link>

          <Link to={isLoggedIn ? ROUTES.createProduct : ROUTES.login}>
            <img className={styles.icon} src={plusIcon} alt="Add" />
          </Link>

          <Link
            to={isLoggedIn ? ROUTES.profile : ROUTES.login}
            className={styles.link}
          >
            <img className={styles.icon} src={profileIcon} alt="Profile" />
          </Link>
        </ul>
      </nav>
    </>
  )
}
