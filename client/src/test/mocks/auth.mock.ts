import { rest } from 'msw'
import { TSignInRequest, TSignUpRequest } from '../../shared/types/Auth.types'

const SignUpApiMock = rest.post<TSignUpRequest>(
  `${import.meta.env.VITE_SERVER_URL}/auth/sign-up`,
  async (req, res, ctx) => {
    const { email, fullName, password } = await req.json()
    if (email && fullName && password) {
      return res(
        ctx.status(201),
        ctx.json({
          error: false,
          message: 'thanks for sign up, now you can sign in!'
        })
      )
    } else {
      return res(
        ctx.status(403),
        ctx.json({ message: 'Invalid email or password' })
      )
    }
  }
)

const SignInApiMock = rest.post<TSignInRequest>(
  `${import.meta.env.VITE_SERVER_URL}/auth/sign-in`,
  async (req, res, ctx) => {
    const { email, password } = await req.json()
    if (email && password) {
      return res(
        ctx.status(200),
        ctx.cookie('acc', 'accessToken'),
        ctx.cookie('ref', 'refreshToken'),
        ctx.json({ error: false, message: 'Welcome back!' })
      )
    } else {
      return res(
        ctx.status(403),
        ctx.json({ message: 'Invalid email or password' })
      )
    }
  }
)

export { SignUpApiMock, SignInApiMock }
