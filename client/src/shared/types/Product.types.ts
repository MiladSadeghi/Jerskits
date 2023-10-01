export interface IProduct {
  _id: string
  name: string
  brand: 'nike' | 'adidas' | 'jordan' | 'puma'
  type: 'football' | 'basketball'
  price: number
  offPrice?: number
  gender: 'men' | 'women' | 'kid'
  color: string[]
  size: string[]
  slug: string
  gallery: string[]
  poster?: string
  detail_product?: {
    title: string
    description?: string
    specification?: string[]
  }[]
}
