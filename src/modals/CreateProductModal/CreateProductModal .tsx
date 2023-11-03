import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import cn from 'classnames'

import { Button } from '../../components/Button/Button'
import { CrossIcon } from '../../components/CrossIcon/CrossIcon'
import { Modal } from '../Modal/Modal'
import { Form, Product } from '../../types'
import { NUMBER_OF_IMAGES } from '../../constants'
import { UploadNewImages } from '../../components/UploadNewImages/UploadNewImages'
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from '../../services/productsApi'
import { ROUTES } from '../../routes'

import styles from './style.module.css'

type Props = {
  setIsOpened: Function
  product?: Product
}

const validPrice = new RegExp(/^([0-9]*[.]?)?(\d{1,2})?$/i)
const regexp = new RegExp(/[^0-9.]/i)

let uploadedImagesArray = Array.from(Array(NUMBER_OF_IMAGES))
let formData = Array.from(Array(NUMBER_OF_IMAGES))

export const CreateProductModal: FC<Props> = ({ setIsOpened, product }) => {
  const initialValue = {
    title: '',
    description: '',
    price: '',
  }

  const navigate = useNavigate()

  const [fieldValue, setFieldValue] = useState<Form>(initialValue)
  const [loading, setLoading] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState<string>('Опубликовать')
  const [price, setPrice] = useState<string>(product?.price.toString() || '')

  const [createProduct] = useCreateProductMutation()
  const [uploadImage] = useUploadProductImageMutation()

  const isFormValid = fieldValue.title?.length && price.toString().length

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ mode: 'onBlur' })

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string
  ) => {
    setButtonText('Опубликовать')
    setFieldValue((prev: Form) => ({ ...prev, [field]: e.target.value }))
  }

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPriceValue = e.target.value

    if (regexp.test(inputPriceValue)) {
      e.target.value = inputPriceValue.replace(regexp, '')
    }

    setPrice(e.target.value)
    setButtonText('Опубликовать')
  }

  const handleClose = () => {
    setIsOpened(false)
  }

  const onSubmit: SubmitHandler<Form> = async (data) => {
    let createdProductId: number | undefined

    try {
      setLoading(true)
      setButtonText('Публикуется...')

      const response = await createProduct({
        title: data.title,
        price: Number(data.price),
        description: data.description,
      }).unwrap()

      createdProductId = response.id

      for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
        if (formData[i] && createdProductId) {
          await uploadImage({
            idx: createdProductId,
            body: formData[i],
          }).unwrap()
        }
      }

      setLoading(false)
      setButtonText('Опубликовано')
      setIsOpened(false)
      navigate(ROUTES.product + '/' + createdProductId)
    } catch (error) {
      setLoading(false)
      setButtonText('Ошибка')
      console.log('error creating product', error)
    }

    formData = formData.map((element) => undefined)
    uploadedImagesArray = uploadedImagesArray.map((element) => undefined)
  }

  return (
    <Modal isOpen={setIsOpened}>
      <div className={styles.content}>
        <div className={styles.closeButton} onClick={handleClose}>
          <CrossIcon />
        </div>

        <h2 className={styles.title}>Новое объявление</h2>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          onClick={(e) => e.stopPropagation()}
          data-cy="create-modal"
        >
          <div className={cn(styles.formContent, styles.inputRequired)}>
            <label className={styles.label}>
              Название
              <input
                {...register('title', {
                  required: 'Введите название',
                })}
                className={styles.input}
                type="text"
                data-cy="create-title"
                placeholder="Введите название"
                value={fieldValue.title || ''}
                onChange={(e) => handleFieldChange(e, 'title')}
                autoFocus
              />
            </label>
            <div className={styles.error}>
              {errors.title && <p>{errors.title.message}</p>}
            </div>
          </div>
          <div className={cn(styles.formContent, styles.areaContent)}>
            <label className={styles.label}>
              Описание
              <textarea
                {...register('description')}
                className={styles.textArea}
                rows={1}
                placeholder="Введите описание"
                data-cy="create-description"
                value={fieldValue.description}
                onChange={(e) => handleFieldChange(e, 'description')}
              />
            </label>
          </div>
          <div className={styles.formContent}>
            <p className={styles.textPhoto}>
              Фотографии товара&nbsp;&nbsp;
              <span className={styles.limit}>
                не более {NUMBER_OF_IMAGES} фотографий
              </span>
            </p>
            <div className={styles.imagesWrapper}>
              <UploadNewImages
                formData={formData}
                uploadedImagesArray={uploadedImagesArray}
              />
            </div>
          </div>
          <div className={cn(styles.formContent, styles.priceBlock)}>
            <label className={styles.label}>
              Цена
              <div className={styles.priceInput}>
                <input
                  {...register('price', {
                    required: 'Введите корректную цену',
                    pattern: {
                      value: validPrice,
                      message: 'Введите корректную цену',
                    },
                  })}
                  className={cn(styles.input, styles.price)}
                  value={price}
                  data-cy="create-price"
                  onChange={handleChangePrice}
                />
                <div className={styles.currency}>₽</div>
              </div>
            </label>
            <div className={styles.error}>
              {errors.price && <p>{errors.price.message}</p>}
            </div>
          </div>

          <Button
            btnType="submit"
            buttonStatus={isFormValid && !loading ? 'normal' : 'disabled'}
          >
            {buttonText}
          </Button>
        </form>
      </div>
    </Modal>
  )
}
