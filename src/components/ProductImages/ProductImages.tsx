import React, { useEffect } from 'react'
import { FC, useState } from 'react'

import { API_URL, NUMBER_OF_IMAGES } from '../../constants'
import { Product, ProductImage } from '../../types'
import { ImageWrapper } from '../ImageWrapper/ImageWrapper'
import { PlusIconInSquare } from '../PlusIconInSquare/PlusIconInSquare'

import deleteButton from './assets/delete-button.svg'
import styles from './style.module.css'

const imgArray = Array.from(Array(NUMBER_OF_IMAGES).keys())

type Props = {
  product: Product
  formData: FormData[] | any[]
  uploadedImagesArray: Blob[] | MediaSource[] | any[]
  urlArrayForDeleting: string[]
}

export const ProductImages: FC<Props> = ({
  product,
  formData,
  uploadedImagesArray,
  urlArrayForDeleting,
}) => {
  const [uploadedImages, setUploadedImages] = useState(uploadedImagesArray)
  const [oldImages, setOldImages] = useState(product.images)

  const numberOfOldImages = oldImages.length
  const plusButtonArray = numberOfOldImages
    ? Array.from(Array(imgArray.length - numberOfOldImages).keys())
    : imgArray

  const handleDeleteNewImages = (index: number) => {
    setUploadedImages((prev) => [
      ...prev.slice(0, index),
      undefined,
      ...prev.slice(index + 1),
    ])

    formData[index] = undefined
  }

  const handleDeleteOldImages = (index: number) => {
    setUploadedImages((prev) => [
      ...prev.slice(0, index),
      undefined,
      ...prev.slice(index + 1),
    ])

    urlArrayForDeleting.push(oldImages[index].url)

    setOldImages((prev: ProductImage[]) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ])

    formData[index] = undefined
  }

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const files = event.target.files
    const file = files ? files[0] : null

    setUploadedImages((prev: Blob[] | MediaSource[]) => [
      ...prev.slice(0, index),
      file,
      ...prev.slice(index + 1),
    ])

    formData[index] = new FormData()
    formData[index].append('file', file)
  }

  useEffect(() => {
    setUploadedImages(uploadedImagesArray)
  }, [uploadedImagesArray])

  return (
    <>
      {oldImages.map((image, index) => (
        <div className={styles.imgContainer} key={image.url}>
          <img
            className={styles.deleteImageButton}
            src={deleteButton}
            alt="Delete"
            onClick={() => handleDeleteOldImages(index)}
          />

          <ImageWrapper
            imageUrl={image.url ? API_URL + image.url : ''}
            name={`Фото ${index}`}
            key={image.url}
            cursor="default"
          />
        </div>
      ))}

      {numberOfOldImages < NUMBER_OF_IMAGES &&
        plusButtonArray.map((el, index) => (
          <React.Fragment key={el}>
            {!uploadedImages[index] && (
              <label className={styles.labelUpload}>
                <PlusIconInSquare />
                <input
                  className={styles.input}
                  type="file"
                  onChange={(e) => handleChange(e, index)}
                  accept="image/*"
                />
              </label>
            )}
            {!!uploadedImages[index] && (
              <div className={styles.imgContainer}>
                <img
                  className={styles.deleteImageButton}
                  src={deleteButton}
                  alt="Delete"
                  onClick={() => handleDeleteNewImages(index)}
                />
                <ImageWrapper
                  imageUrl={URL.createObjectURL(uploadedImages[index])}
                  cursor="default"
                />
              </div>
            )}
          </React.Fragment>
        ))}
    </>
  )
}
