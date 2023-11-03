import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { API_URL } from '../constants'
import { RootState } from '../store/store'
import { Comment, Product } from '../types'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  tagTypes: ['Products'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).token.access_token
      if (token) headers.set('authorization', `Bearer ${token}`)
      return headers
    },
  }),
  endpoints: (build) => ({
    getProducts: build.query<Product[], void | number>({
      query: (userId) => (userId ? `ads?user_id=${userId}` : 'ads'),
      providesTags: (result) =>
        result
          ? [
              { type: 'Products', id: 'LIST' },
              ...result.map(({ id }) => ({
                type: 'Products' as const,
                id,
              })),
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    getProduct: build.query<Product, number>({
      query: (idx: number) => `ads/${idx}`,
      providesTags: () => [{ type: 'Products', id: 'LIST' }],
    }),
    getProductComments: build.query<Comment[], number | undefined>({
      query: (idx?: number) => `ads/${idx}/comments`,
      providesTags: (result) =>
        result
          ? [
              { type: 'Products', id: 'LIST' },
              ...result.map(({ id }) => ({
                type: 'Products' as const,
                id,
              })),
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    deleteProduct: build.mutation<void, number>({
      query: (idx) => ({
        url: `ads/${idx}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    uploadProductImage: build.mutation<void, { idx: number; body: FormData }>({
      query: ({ idx, body }) => ({
        url: `ads/${idx}/image`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    createProduct: build.mutation<
      Product,
      { title?: string; description?: string; price?: number }
    >({
      query: (body) => ({
        url: 'adstext',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    changeProductDetails: build.mutation({
      query: ({ idx, body }) => ({
        url: `ads/${idx}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    deleteProductImage: build.mutation<void, { idx: number; imgUrl: string }>({
      query: ({ idx, imgUrl }) => ({
        url: `ads/${idx}/image?file_url=${imgUrl}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    getComments: build.query<Comment[], number>({
      query: (productId) => `ads/${productId}/comments`,
      providesTags: (result) =>
        result
          ? [
              { type: 'Products', id: 'LIST' },
              ...result.map(({ id }) => ({
                type: 'Products' as const,
                id,
              })),
            ]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    createComment: build.mutation<
      Comment,
      { productId: number; body: { text: string } }
    >({
      query: ({ productId, body }) => ({
        url: `ads/${productId}/comments`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useGetProductCommentsQuery,
  useCreateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useDeleteProductImageMutation,
  useChangeProductDetailsMutation,
  useCreateCommentMutation,
  useGetCommentsQuery,
} = productsApi
