import { rest } from 'msw'

export const SignInWIthRefreshTokenMock = rest.get(
  `${import.meta.env.VITE_SERVER_URL}/auth/refresh`,
  (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ accessToken: 'fakeAccessToken' }))
  }
)
