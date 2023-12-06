import {
  TProductRequest,
  TProductResponse,
  TSearchRequest,
  TSearchResponse
} from './../shared/types/Product.types'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithAuth } from './api'
import {
  TBrand,
  TGender,
  TProductsResponse,
  TSort,
  TType
} from '../shared/types/Product.types'

type TGetProductsRequest = {
  minPrice?: number
  maxPrice?: number
  color?: string
  size?: string
  gender?: TGender
  brand?: TBrand
  type?: TType
  sort?: TSort
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
    }),
    getProduct: build.query<TProductResponse, TProductRequest>({
      query(slug) {
        return {
          url: `/products/${slug}`,
          method: 'GET'
        }
      }
    }),
    searchProducts: build.query<TSearchResponse, TSearchRequest>({
      query(query) {
        return {
          url: `/products/search`,
          method: 'GET',
          params: { q: query }
        }
      }
    })
  })
})

export { productApi }
export const {
  useLazyGetProductsQuery,
  useGetProductQuery,
  useLazySearchProductsQuery
} = productApi
