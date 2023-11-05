import { SignInApiMock, SignUpApiMock } from './auth.mock'
import { SignInWIthRefreshTokenMock } from './navbar.mock'
import { GetProfileMock, SubmitProfileMock } from './profile.mock.ts'
import {
  getLandingPageMock,
  getKidCollectionByBrand
} from './landingPage.mock.ts'
import { getProducts } from './product.mock.ts'
import { getLocation } from './profile.mock.ts'

const handler = [
  SignUpApiMock,
  SignInApiMock,
  SignInWIthRefreshTokenMock,
  GetProfileMock,
  SubmitProfileMock,
  getLandingPageMock,
  getProducts,
  getLocation,
  getKidCollectionByBrand
]

export default handler
