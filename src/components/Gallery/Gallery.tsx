import { Link } from 'react-router-dom'
import { FC, useEffect } from 'react'

import { ROUTES } from '../../routes'
import { Card } from '../Card/Card'
import { useGetProductsQuery } from '../../services/productsApi'
import { Product } from '../../types'
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch'
import { filteredProductsSelector } from '../../store/selectors/filteredProducts'
import { setProducts } from '../../store/productsSlice'
import { querySelector } from '../../store/selectors/querySelector'

import styles from './style.module.css'

type Props = { sellerId?: number; isProfilePage?: boolean }

export const Gallery: FC<Props> = ({ sellerId, isProfilePage }) => {
  const dispatch = useAppDispatch()

  const filteredProducts = useAppSelector(filteredProductsSelector)
  const query = useAppSelector(querySelector)

  const { data: products, isLoading, error } = useGetProductsQuery(sellerId)

  useEffect(() => {
    if (!query && products) {
      dispatch(setProducts(products))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  if (isLoading) {
    return <div className={styles.content}>Загрузка...</div>
  }

  if (error) {
    return (
      <p className={styles.errorMessage}>
        Извините, произошла ошибка! {JSON.stringify(error)}
      </p>
    )
  }

  return (
    <>
      {!filteredProducts?.length && (
        <p className={styles.errorMessage}>
          {isProfilePage
            ? 'Товары еще не добавлены'
            : 'По вашему запросу ничего не найдено'}
        </p>
      )}

      <div className={styles.gallery} data-cy="gallery-products">
        {filteredProducts.map((product: Product, index: number) => (
          <Link
            key={product.id}
            to={`${ROUTES.product}/${product.id}`}
            className={styles.link}
          >
            <Card product={product} key={product.images[0]?.url + index} />
          </Link>
        ))}
      </div>
    </>
  )
}
