import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '../../components/Button/Button'
import { CommentBlock } from '../../components/CommentBlock/CommentBlock'
import {
  useCreateCommentMutation,
  useGetProductCommentsQuery,
} from '../../services/productsApi'
import { useLoadCredentialsFromCookies } from '../../hooks/useLoadCredentialsFromCookies'
import { PageWrapper } from '../PageWrapper/PageWrapper'

import back from './assets/back.svg'
import styles from './style.module.css'

export const CommentPage: FC = () => {
  const productId = Number(useParams()?.id)

  const navigate = useNavigate()
  const { data: comments, isLoading: isLoadingComments } =
    useGetProductCommentsQuery(productId)

  const [createComment] = useCreateCommentMutation()
  const isLoggedIn = useLoadCredentialsFromCookies()

  const [isBlocked, setIsBlocked] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  const [buttonText, setButtonText] = useState<string>('Опубликовать')

  const { register, handleSubmit } = useForm<{ text: string }>({
    mode: 'onBlur',
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setButtonText('Опубликовать')
    setComment(e.target.value)
    setIsBlocked(!e.target.value.trim().length)
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

      setLoading(false)
      setButtonText('Опубликовано')
      setComment('')
      setIsBlocked(true)
    } catch (error) {
      setButtonText('Ошибка')
      console.log('error creating comment', error)
    }
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <PageWrapper scrollToTop={true}>
      <div className={styles.commentsPageWrapper}>
        <h1 className={styles.title}>
          <img
            className={styles.backbtn}
            src={back}
            alt="back"
            onClick={handleBack}
          />
          Отзывы о товаре
        </h1>

        <div className={styles.contentWrapper}>
          {isLoggedIn && (
            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.formContent}>
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
            <CommentBlock
              comment={comment}
              key={comment + comment.created_on + index}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  )
}
