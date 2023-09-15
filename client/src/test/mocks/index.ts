import { SignInApiMock, SignUpApiMock } from './auth.mock'
import { SignInWIthRefreshTokenMock } from './navbar.mock'
import { GetProfileMock, SubmitProfileMock } from './profile.mock.ts'
import { getLandingPageMock } from './landingPage.ts'

const handler = [
  SignUpApiMock,
  SignInApiMock,
  SignInWIthRefreshTokenMock,
  GetProfileMock,
  SubmitProfileMock,
  getLandingPageMock
]

export default handler
