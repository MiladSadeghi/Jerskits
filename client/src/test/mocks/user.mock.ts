import { rest } from 'msw'
import { mockData } from './product.mock'

export const getUserFavoritesProducts = rest.get(
  `${import.meta.env.VITE_SERVER_URL}/user/favorites`,
  (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        error: false,
        favorites: mockData
      })
    )
  }
)

export const removeUserFavorites = rest.delete(
  `${import.meta.env.VITE_SERVER_URL}/user/favorites/:productId`,
  (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        error: false,
        message: 'Product removed from favorites'
      })
    )
  }
)

export const addUserFavorites = rest.post<{ productId: string }>(
  `${import.meta.env.VITE_SERVER_URL}/user/favorites`,
  async (req, res, ctx) => {
    const { productId } = await req.json<{ productId: string }>()
    const product = mockData.find((product) => product._id === productId)

    if (product) {
      return res(
        ctx.status(200),
        ctx.json({
          error: false,
          message: 'Product added to favorites',
          product
        })
      )
    }
  }
)
