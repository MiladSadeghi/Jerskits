import { SignInApiMock, SignUpApiMock } from './auth.mock'
import { SignInWIthRefreshTokenMock } from './navbar.mock'
import { GetProfileMock, SubmitProfileMock } from './profile.mock.ts'
import {
  getLandingPageMock,
  getKidCollectionByBrand
} from './landingPage.mock.ts'
import { getProducts, getProduct } from './product.mock.ts'
import { getLocation } from './profile.mock.ts'
import { submitReviewMock } from './review.mock.ts'
import {
  getUserFavoritesProducts,
  removeUserFavorites,
  addUserFavorites,
  getBag,
  AddToBag,
  removeFromBag,
  updateBagItemQuantity,
  updateBagItemSize
} from './user.mock.ts'

const handler = [
  SignUpApiMock,
  SignInApiMock,
  SignInWIthRefreshTokenMock,
  GetProfileMock,
  SubmitProfileMock,
  getLandingPageMock,
  getProducts,
  getLocation,
  getKidCollectionByBrand,
  getProduct,
  submitReviewMock,
  getUserFavoritesProducts,
  removeUserFavorites,
  addUserFavorites,
  getBag,
  AddToBag,
  removeFromBag,
  updateBagItemQuantity,
  updateBagItemSize
]

export default handler
