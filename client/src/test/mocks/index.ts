import { SignInApiMock, SignUpApiMock } from './auth.mock'
import { SignInWIthRefreshTokenMock } from './navbar.mock'
import { GetProfileMock, SubmitProfileMock } from './profile.mock.ts'
import { getLandingPageMock } from './landingPage.mock.ts'
import { getProducts } from './product.mock.ts'

const handler = [
  SignUpApiMock,
  SignInApiMock,
  SignInWIthRefreshTokenMock,
  GetProfileMock,
  SubmitProfileMock,
  getLandingPageMock,
  getProducts
]

export default handler
