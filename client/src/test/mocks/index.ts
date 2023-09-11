import { SignInApiMock, SignUpApiMock } from './auth.mock'
import { SignInWIthRefreshTokenMock } from './navbar.mock'
import { GetProfileMock, SubmitProfileMock } from './profile.mock.ts'

const handler = [
  SignUpApiMock,
  SignInApiMock,
  SignInWIthRefreshTokenMock,
  GetProfileMock,
  SubmitProfileMock
]

export default handler
