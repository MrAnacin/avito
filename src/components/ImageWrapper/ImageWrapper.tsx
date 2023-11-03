import { FC, useState } from 'react'
import { Skeleton } from '@mui/material'

import styles from './style.module.css'

type Props = {
  imageUrl?: string
  name?: string
  mb?: string
  cursor?: 'pointer' | 'default'
  onClick?: any
}

export const ImageWrapper: FC<Props> = ({
  imageUrl,
  name,
  mb,
  onClick,
  cursor = 'default',
}) => {
  const [loading, setLoading] = useState<boolean>(true)

  const handleLoad = () => setLoading(false)

  return (
    <div
      className={styles.imgWrapper}
      onClick={onClick}
      style={{ marginBottom: mb, cursor: cursor }}
    >
      {!imageUrl && <p>Фото отсутствует</p>}
      {imageUrl && loading && (
        <Skeleton variant="rectangular" className={styles.skeleton} />
      )}
      {imageUrl && (
        <img
          className={styles.img}
          width="100%"
          height="100%"
          src={imageUrl}
          alt={name}
          onLoad={handleLoad}
        />
      )}
    </div>
  )
}
