import { TReview } from './Review.types'

export interface IProduct {
  _id: string
  name: string
  brand: TBrand
  type: TType
  price: number
  offPrice: number
  gender: TGender
  color: string[]
  size: string[]
  slug: string
  gallery: string[]
  poster?: string
  detail_product?: TDetailProduct[]
}

export type TBrand = 'nike' | 'adidas' | 'jordan' | 'puma'

export type TType = 'football' | 'basketball'

export type TGender = 'men' | 'women' | 'kid'

export type Price = {
  minPrice: number
  maxPrice: number
}

export type TSort = 'relevance' | 'new arrivals' | 'price:low' | 'price:high'

export type TDetailProduct = {
  title: string
  description?: string
  specification?: string[]
}

export type TProductsResponse = {
  error: boolean
  products: IProduct[]
  totalPages: number
  currentPage: number
  highestPrice: number
}

export type TProductRequest = string

export type TProductResponse = {
  error: boolean
  product: IProduct
  reviews: TReview[]
}

export type TSearchResponse = {
  products: IProduct[]
  suggestions: string[]
}

export type TSearchRequest = string
