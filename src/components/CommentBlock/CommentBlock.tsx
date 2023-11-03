import { FC } from 'react'

import { Comment } from '../../types'
import { convertDate } from '../../utils/convertDate'
import { Avatar } from '../Avatar/Avatar'

import styles from './style.module.css'

type Props = { comment: Comment }

export const CommentBlock: FC<Props> = ({ comment }) => {
  return (
    <div className={styles.review}>
      <div className={styles.avatarWrapper}>
        <Avatar user={comment.author} />
      </div>

      <div className={styles.reviewContent}>
        <p className={styles.name}>
          {comment.author.name}{' '}
          <span className={styles.date}>{convertDate(comment.created_on)}</span>
        </p>
        <p className={styles.text}>{comment.text}</p>
      </div>
    </div>
  )
}
