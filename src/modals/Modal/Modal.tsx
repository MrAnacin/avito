import { FC, ReactNode } from 'react'

import { useEscapeKey } from '../../hooks/useEscapeKey'

import styles from './style.module.css'

type ModalProps = {
  isOpen: Function
  handleEsc?: Function
  children?: ReactNode
}

export const Modal: FC<ModalProps> = ({ isOpen, children, handleEsc }) => {
  useEscapeKey({ isOpen, handleEsc })

  return (
    <div data-cy="modal" className={styles.modal}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  )
}
