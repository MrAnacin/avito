import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { FC, useState } from 'react'

import { User } from '../../types'
import { AvatarImageBlock } from '../AvatarImageBlock/AvatarImageBlock'

import styles from './style.module.css'

type Props = {
  user: User
  loading: boolean
  setIsBlocked: Function
  formData: FormData[]
  avatarError?: FetchBaseQueryError | SerializedError
}

export const AvatarBlock: FC<Props> = ({
  user,
  formData,
  avatarError,
  loading,
  setIsBlocked,
}) => {
  const [uploadedAvatar, setUploadedAvatar] = useState<string>()

  const handleUploadAvatar = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files
    const file = files ? files[0] : null

    if (!file) {
      return
    }

    formData[0] = new FormData()
    formData[0].append('file', file)

    if (files && file) {
      setUploadedAvatar(URL.createObjectURL(file))
      setIsBlocked(false)
    }
  }

  return (
    <div className={styles.avatarBlockWrapper}>
      <div className={styles.avatarBlock}>
        <AvatarImageBlock
          user={user}
          loading={loading}
          avatarError={avatarError}
          uploadedAvatar={uploadedAvatar}
        />
        <label className={styles.changeAvatar}>
          Заменить
          <input
            className={styles.changeAvatarInput}
            type="file"
            onChange={handleUploadAvatar}
            accept="image/*"
          />
        </label>
      </div>
    </div>
  )
}
