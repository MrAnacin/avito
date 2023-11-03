import { FC } from 'react'

import { API_URL } from '../../constants'
import { Product } from '../../types'
import { convertDate } from '../../utils/convertDate'
import { ImageWrapper } from '../ImageWrapper/ImageWrapper'

import styles from './style.module.css'

type Props = { product: Product }

export const Card: FC<Props> = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.wrapperMB}>
        <ImageWrapper
          imageUrl={
            product.images[0]?.url ? API_URL + product.images[0]?.url : ''
          }
          name={product?.title}
          cursor="pointer"
        />
      </div>
      <div className={styles.textWrapper}>
        <p className={styles.title}>{product.title}</p>
        <p className={styles.price}>{product.price} ₽</p>
        <p className={styles.location}>{product.user.city}</p>
        <p className={styles.date}>{convertDate(product.created_on)}</p>
      </div>
    </div>
  )
}
