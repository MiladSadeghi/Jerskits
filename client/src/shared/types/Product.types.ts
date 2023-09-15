export interface IProduct {
  _id: string
  name: string
  brand: 'nike' | 'adidas' | 'jordan'
  type: 'football' | 'basketball'
  price: number
  offPrice?: number
  gender: 'men' | 'women' | 'kid'
  color: string[]
  size: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '2XL' | 'XXXL' | '3XL')[]
  slug: string
  gallery: string[]
  poster?: string
  detail_product?: {
    title: string
    description?: string
    specification?: string[]
  }[]
}
