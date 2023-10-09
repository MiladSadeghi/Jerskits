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
}
