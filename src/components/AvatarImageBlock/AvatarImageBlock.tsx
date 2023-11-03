import { FC } from 'react'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

import { User } from '../../types'
import { Avatar } from '../Avatar/Avatar'

import styles from './style.module.css'

type Props = {
  user: User
  loading: boolean
  avatarError?: FetchBaseQueryError | SerializedError
  uploadedAvatar?: string
}

export const AvatarImageBlock: FC<Props> = ({
  user,
  loading,
  avatarError,
  uploadedAvatar,
}) => {
  if (loading) {
    return <div className={styles.avatarImageWrapper}>Загрузка...</div>
  }

  if (avatarError) {
    return <Avatar error={true} mb="10px" />
  }

  if (!uploadedAvatar) {
    return <Avatar user={user} mb="10px" />
  }

  return <Avatar user={user} uploadedAvatar={uploadedAvatar} mb="10px" />
}
