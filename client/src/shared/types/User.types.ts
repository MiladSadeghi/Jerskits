import { IProduct } from './Product.types'
import { IProfile } from './Profile.types'

export interface IGetUserResponse {
  profile: IProfile
  favorites: IProduct[]
}

export interface IUserState {
  favorites: IProduct[]
}

export interface IGetUserFavoritesResponse {
  error: boolean
  favorites: IProduct[]
}

export interface IFavoriteOperationResponse {
  success: boolean
  message: string
  product: IProduct
}
