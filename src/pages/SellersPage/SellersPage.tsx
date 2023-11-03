import { useNavigate, useParams } from 'react-router-dom'

import { Avatar } from '../../components/Avatar/Avatar'
import { Gallery } from '../../components/Gallery/Gallery'
import { PhoneButton } from '../../components/PhoneButton/PhoneButton'
import { useGetProductsQuery } from '../../services/productsApi'
import { formatDate } from '../../utils/formatDate'
import { PageWrapper } from '../PageWrapper/PageWrapper'

import back from './assets/back.svg'
import styles from './style.module.css'

export const SellersPage = () => {
  const sellerId = Number(useParams()?.id)
  const { data: products, isLoading } = useGetProductsQuery(sellerId)
  const navigate = useNavigate()

  const seller = products?.length
    ? products[0].user
    : { id: 0, email: '', city: '', name: '', surname: '', phone: '' }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <PageWrapper scrollToTop={true}>
      <>
        <h2 className={styles.title}>
          <img
            className={styles.backbtn}
            src={back}
            alt="back"
            onClick={handleBack}
          />
          Профиль продавца
        </h2>

        <div className={styles.sellersInfo}>
          <div className={styles.sellerAvatar}>
            <Avatar user={seller} />
          </div>

          <div className={styles.sellersData}>
            {isLoading && <p className={styles.sellerCity}>Загрузка...</p>}
            <p className={styles.sellerName}>
              {seller.name} {seller.surname}
            </p>
            <p className={styles.sellerCity}>{seller.city}</p>
            <p className={styles.sellerDate}>
              {seller.sells_from && (
                <span>Продает товары с {formatDate(seller.sells_from)}</span>
              )}
            </p>
          </div>

          <div className={styles.phoneButton}>
            <PhoneButton phone={seller?.phone} size="l" />
          </div>
        </div>

        <h2 className={styles.subtitle}>Товары продавца</h2>
        <Gallery sellerId={sellerId} />
      </>
    </PageWrapper>
  )
}
