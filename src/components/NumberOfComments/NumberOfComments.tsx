import { FC } from 'react'

import { ending } from '../../utils/ending'
import { useGetProductCommentsQuery } from '../../services/productsApi'

type Props = {
  productId: number
}

export const NumberOfComments: FC<Props> = ({ productId }) => {
  const { data: comments, isLoading: isLoadingComments } =
    useGetProductCommentsQuery(productId)

  const numberOfComments = comments?.length

  return (
    <>
      {isLoadingComments && 'Загрузка...'}
      {!!numberOfComments && (
        <span>
          {numberOfComments} отзыв{ending(numberOfComments)}
        </span>
      )}
      {!numberOfComments && !isLoadingComments && 'Нет отзывов'}
    </>
  )
}
