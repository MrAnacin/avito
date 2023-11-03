import { FC } from 'react'

import styles from './style.module.css'

export const CrossIcon: FC = () => {
  return (
    <svg
      className={styles.icon}
      width="43"
      height="43"
      viewBox="0 0 43 43"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M31.8193 10.6066L10.6061 31.8198" strokeWidth="2" />
      <path d="M31.8193 31.8198L10.6061 10.6066" strokeWidth="2" />
    </svg>
  )
}
