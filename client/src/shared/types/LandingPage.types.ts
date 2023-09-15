import { IProduct } from './Product.types'

export type TLandingPageHeaderProduct = IProduct & {
  stadiumImage: string
  teamLogo: string
  posterTitle: string
  teamName: string
  howWasMade: string
  posterDescription: string
  kitLogo: string
}

export type TLandingPageResponse = {
  error: boolean
  header: TLandingPageHeaderProduct[]
}
