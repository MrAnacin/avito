import { FC, ReactNode } from 'react'
import { useCookies } from 'react-cookie'
import cn from 'classnames'

import { Header } from '../../components/Header/Header'
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop'
import { useAppSelector } from '../../hooks/useAppDispatch'
import { accessTokenSelector } from '../../store/selectors/tokens'

import styles from './style.module.css'

type Props = {
  children?: ReactNode
  scrollToTop?: boolean
  searchHeader?: boolean
  noPadding?: boolean
}

export const PageWrapper: FC<Props> = ({
  children,
  noPadding = false,
  searchHeader = false,
  scrollToTop = false,
}) => {
  const [cookies] = useCookies(['access', 'refresh'])
  const access_token = useAppSelector(accessTokenSelector)

  const isLoggedIn = cookies && cookies.access && access_token ? true : false

  return (
    <>
      {scrollToTop && <ScrollToTop />}
      <Header isLoggedIn={isLoggedIn} searchHeader={searchHeader} />
      <div
        className={cn(styles.pageWrapper, { [styles.noPadding]: noPadding })}
      >
        {children}
      </div>
    </>
  )
}
