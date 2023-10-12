import { createApi } from '@reduxjs/toolkit/dist/query/react'
import { baseQueryWithAuth } from './api'
import { TBrand, TProductsResponse, TType } from '../shared/types/Product.types'

type TGetProductsRequest = {
  minPrice?: number
  maxPrice?: number
  color?: string
  size?: string
  brand?: TBrand
  type?: TType
  sort?: 'first' | 'last' | 'lowprice' | 'highprice'
  page?: number
  perPage?: number
}

const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (build) => ({
    getProducts: build.query<TProductsResponse, TGetProductsRequest>({
      query(args) {
        return {
          url: '/products',
          method: 'GET',
          params: {
            ...args
          }
        }
      }
    })
  })
})

export { productApi }
export const { useLazyGetProductsQuery } = productApi
