import { PageWrapper } from '../PageWrapper/PageWrapper'

import styles from './style.module.css'

export const NotFound = () => {
  return (
    <PageWrapper>
      <h2 className={styles.subtitle}>404 такой страницы нет</h2>
    </PageWrapper>
  )
}
