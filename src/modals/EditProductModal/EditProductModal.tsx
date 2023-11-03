import React, { FC, useState } from 'react'
import cn from 'classnames'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '../../components/Button/Button'
import { CrossIcon } from '../../components/CrossIcon/CrossIcon'
import { Modal } from '../Modal/Modal'
import { Product } from '../../types'
import { NUMBER_OF_IMAGES } from '../../constants'
import { ProductImages } from '../../components/ProductImages/ProductImages'
import {
  useChangeProductDetailsMutation,
  useDeleteProductImageMutation,
  useUploadProductImageMutation,
} from '../../services/productsApi'

import styles from './style.module.css'

type Props = {
  setIsOpened: Function
  product: Product
}

type Form = {
  title?: string
  description?: string
  price?: number
}

const validPrice = new RegExp(/^([0-9]*[.]?)?(\d{1,2})?$/i)
const regexp = new RegExp(/[^0-9.]/i)

let uploadedImagesArray = Array.from(Array(NUMBER_OF_IMAGES))
let formData = Array.from(Array(NUMBER_OF_IMAGES))
let urlArrayForDeleting: string[] = []

export const EditProductModal: FC<Props> = ({ setIsOpened, product }) => {
  const initialValue = {
    title: product.title,
    description: product.description,
    price: product.price,
  }

  const [fieldValue, setFieldValue] = useState<Form>(initialValue)
  const [loading, setLoading] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState<string>('Сохранить')
  const [price, setPrice] = useState<string>(product.price.toString() || '')
  const [deleting, setDeleting] = useState(false)

  const [changeProductDetails] = useChangeProductDetailsMutation()
  const [uploadImage] = useUploadProductImageMutation()
  const [deleteImage] = useDeleteProductImageMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ mode: 'onBlur' })

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: string
  ) => {
    setButtonText('Сохранить')
    setFieldValue((prev: Form) => ({ ...prev, [field]: e.target.value }))
  }

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPriceValue = e.target.value

    if (regexp.test(inputPriceValue)) {
      e.target.value = inputPriceValue.replace(regexp, '')
    }

    setPrice(e.target.value)
    setButtonText('Сохранить')
  }

  const handleClose = () => {
    setIsOpened(false)
  }

  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      setLoading(true)
      setButtonText('Сохраняется...')

      await changeProductDetails({
        idx: product.id,
        body: {
          title: data.title,
          price: data.price,
          description: data.description,
        },
      }).unwrap()

      for (let i = 0; i < NUMBER_OF_IMAGES; i++) {
        if (formData[i] && product.id) {
          await uploadImage({ idx: product.id, body: formData[i] }).unwrap()
        }
      }

      for (let i = 0; i < urlArrayForDeleting.length; i++) {
        if (deleting) {
          return
        }

        setDeleting(true)

        try {
          await deleteImage({
            idx: product.id,
            imgUrl: urlArrayForDeleting[i],
          }).unwrap()
        } catch (error) {
          console.log(error)
          setLoading(false)
          setButtonText('Ошибка')
        }
        setDeleting(false)
      }

      setLoading(false)
      setButtonText('Сохранено')
      setIsOpened(false)
    } catch {
      setLoading(false)
      setButtonText('Ошибка')
    }

    formData = formData.map((element) => undefined)
    uploadedImagesArray = uploadedImagesArray.map((element) => undefined)
    urlArrayForDeleting = []
  }

  const isFormValid = fieldValue.title?.length && price.toString().length

  return (
    <Modal isOpen={setIsOpened}>
      <div className={styles.content}>
        <div className={styles.closeButton} onClick={handleClose}>
          <CrossIcon />
        </div>

        <h2 className={styles.title}>Редактировать объявление</h2>

        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          onClick={(e) => e.stopPropagation()}
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
              <ProductImages
                product={product}
                formData={formData}
                uploadedImagesArray={uploadedImagesArray}
                urlArrayForDeleting={urlArrayForDeleting}
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
