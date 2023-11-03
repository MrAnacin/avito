import { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import { useMediaQuery } from 'react-responsive'

import { Navigation } from '../Navigation/Navigation'
import { ProfileHeader } from '../ProfileHeader/ProfileHeader'
import { SearchBar } from '../SearchBar/SearchBar'
import { SCREEN_SIZE } from '../../constants'
import { NavigationMobile } from '../NavigationMobile/NavigationMobile'

import styles from './style.module.css'

type Props = {
  isLoggedIn?: boolean
  searchHeader?: boolean
}

export const Header: FC<Props> = ({ isLoggedIn, searchHeader = false }) => {
  const [scrolled, setScrolled] = useState(false)

  const isDesktop = useMediaQuery({
    query: SCREEN_SIZE.desktop,
  })
  const isMobile = useMediaQuery({ query: SCREEN_SIZE.mobile })

  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY > 15) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
  }, [])

  return (
    <>
      <div className={styles.navWrapper}>
        {isDesktop && <Navigation isLoggedIn={isLoggedIn} />}
        {isMobile && <NavigationMobile isLoggedIn={isLoggedIn} />}
      </div>
      <div
        className={cn(styles.searchWrapper, { [styles.scrolled]: scrolled })}
      >
        {searchHeader ? <SearchBar /> : <ProfileHeader />}
      </div>
    </>
  )
}
