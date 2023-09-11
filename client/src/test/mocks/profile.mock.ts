import { rest } from 'msw'

type SubmitProfileMockAPI = {
  firstName: string
  lastName: string
}

export const GetProfileMock = rest.get(
  `${import.meta.env.VITE_SERVER_URL}/profile`,
  (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ profile: { firstName: 'test', lastName: 'test2' } })
    )
  }
)

export const SubmitProfileMock = rest.patch<SubmitProfileMockAPI>(
  `${import.meta.env.VITE_SERVER_URL}/profile`,
  (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ profile: { firstName: 'test3', lastName: 'test4' } })
    )
  }
)
