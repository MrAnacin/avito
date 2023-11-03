import { FC } from 'react'

import styles from './style.module.css'

type Props = { onClick?: any }

export const PlusIconInSquare: FC<Props> = ({ onClick }) => {
  return (
    <div className={styles.square} onClick={onClick}>
      <svg
        className={styles.icon}
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15 0V30" strokeWidth="3" />
        <path d="M30 15L1.10269e-06 15" strokeWidth="3" />
      </svg>
      <img src="" alt="" />
    </div>
  )
}
