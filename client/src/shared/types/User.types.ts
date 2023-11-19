import { IProduct } from './Product.types'
import { IProfile } from './Profile.types'

export interface IGetUserResponse {
  profile: IProfile
  favorites: IProduct[]
}

export interface IUserState {
  favorites: IProduct[]
}
