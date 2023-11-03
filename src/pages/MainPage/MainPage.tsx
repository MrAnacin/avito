import { Gallery } from '../../components/Gallery/Gallery'
import { PageWrapper } from '../PageWrapper/PageWrapper'

import styles from './style.module.css'

export const MainPage = () => {
  return (
    <PageWrapper searchHeader={true}>
      <h1 className={styles.title}>Объявления</h1>
      <Gallery />
    </PageWrapper>
  )
}
