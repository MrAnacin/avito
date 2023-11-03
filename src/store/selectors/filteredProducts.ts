/**
 *  Returns the initial array if ( query === '' )
 */

import { RootState } from '../store'

export const filteredProductsSelector = (state: RootState) => {
  const products = state.products
  const query = state.query.trim().toLowerCase()

  return products.filter((product) =>
    product.title.trim().toLowerCase().includes(query)
  )
}
