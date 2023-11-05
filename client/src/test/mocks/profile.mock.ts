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

export const getLocation = rest.get<{ country: Option[] }>(
  `${import.meta.env.VITE_SERVER_URL}/location`,
  (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ country: [{ value: 'IR', label: 'iran' }] })
    )
  }
)
