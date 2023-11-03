import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '../../components/Button/Button'
import { CrossIcon } from '../../components/CrossIcon/CrossIcon'
import { CommentBlock } from '../../components/CommentBlock/CommentBlock'
import { Modal } from '../Modal/Modal'
import {
  useCreateCommentMutation,
  useGetProductCommentsQuery,
} from '../../services/productsApi'
import { useLoadCredentialsFromCookies } from '../../hooks/useLoadCredentialsFromCookies'

import styles from './style.module.css'

type Props = {
  setIsOpened: Function
  productId: number
}

export const CommentModal: FC<Props> = ({ setIsOpened, productId }) => {
  const { data: comments, isLoading: isLoadingComments } =
    useGetProductCommentsQuery(productId)
  const [createComment] = useCreateCommentMutation()

  const isLoggedIn = useLoadCredentialsFromCookies()

  const { register, handleSubmit } = useForm<{ text: string }>({
    mode: 'onBlur',
  })

  const [isBlocked, setIsBlocked] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  const [buttonText, setButtonText] = useState<string>('Опубликовать')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const trimmedTextLength = e.target.value.trim().length
    setButtonText('Опубликовать')
    setComment(e.target.value)
    setIsBlocked(!trimmedTextLength)
  }

  const handleClose = () => {
    setIsOpened(false)
  }

  const onSubmit: SubmitHandler<{ text: string }> = async (newComment) => {
    try {
      setLoading(true)
      setButtonText('Публикуется...')

      await createComment({
        productId,
        body: {
          text: newComment.text,
        },
      }).unwrap()

      setButtonText('Опубликовано')
      setComment('')
      setIsBlocked(true)
      setLoading(false)
    } catch (error) {
      setButtonText('Ошибка')
      console.log('error creating comment', error)
    }
  }

  return (
    <Modal isOpen={setIsOpened}>
      <div className={styles.content}>
        <h2 className={styles.title}>Отзывы о товаре</h2>
        <div className={styles.closeButton} onClick={handleClose}>
          <CrossIcon />
        </div>

        <div className={styles.contentWrapper}>
          {isLoggedIn && (
            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.formContent}>
                <label htmlFor="text" className={styles.label}>
                  Добавить отзыв
                </label>
                <textarea
                  {...register('text')}
                  className={styles.textArea}
                  rows={3}
                  placeholder="Введите отзыв"
                  onChange={handleChange}
                  value={comment}
                />
              </div>

              <Button
                buttonStatus={loading || isBlocked ? 'disabled' : 'normal'}
                btnType="submit"
                size="xl"
              >
                {buttonText}
              </Button>
            </form>
          )}

          {isLoadingComments && <p>Загрузка отзывов...</p>}

          {!isLoadingComments && !comments?.length && <p>Отзывов пока нет</p>}

          {comments?.map((comment, index) => (
            <CommentBlock comment={comment} key={comment.created_on + index} />
          ))}
        </div>
      </div>
    </Modal>
  )
}
