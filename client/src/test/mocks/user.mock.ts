import { rest } from 'msw'
import { mockData } from './product.mock'
import { TBag } from '../../shared/types/User.types'

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

const mockedBag: TBag = {
  _id: '24',
  createdAt: new Date().toString(),
  updatedAt: new Date().toString(),
  user: '747',
  subTotal: 79.95,
  items: [
    {
      product: mockData[0],
      _id: '1',
      price: 79.95,
      quantity: 1,
      size: 'S',
      total: 79.95
    }
  ]
}

export const getBag = rest.get(
  `${import.meta.env.VITE_SERVER_URL}/user/bag`,
  async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        error: false,
        bag: mockedBag
      })
    )
  }
)

export const AddToBag = rest.post(
  `${import.meta.env.VITE_SERVER_URL}/user/bag`,
  async (req, res, ctx) => {
    mockedBag.items.push({
      product: mockData[1],
      _id: '2',
      price: 124.95,
      quantity: 1,
      size: 'SM',
      total: 124.95
    })
    mockedBag.subTotal += mockData[1].price
    return res(
      ctx.status(200),
      ctx.json({
        error: false,
        bag: mockedBag,
        message: 'Product added to bag'
      })
    )
  }
)

export const removeFromBag = rest.delete(
  `${import.meta.env.VITE_SERVER_URL}/user/bag/:productId`,
  async (req, res, ctx) => {
    const { productId } = req.params
    mockedBag.items = mockedBag.items.filter(
      (item) => item.product._id !== productId
    )
    mockedBag.subTotal -= mockData[1].price
    return res(
      ctx.status(200),
      ctx.json({
        error: false,
        bag: mockedBag,
        message: 'Product removed from bag'
      })
    )
  }
)

export const updateBagItemQuantity = rest.patch(
  `${import.meta.env.VITE_SERVER_URL}/user/bag/quantity`,
  async (req, res, ctx) => {
    const { quantity } = await req.json()
    mockedBag.items[0].quantity = quantity
    mockedBag.items[0].total = quantity * mockedBag.items[0].price
    mockedBag.subTotal += mockedBag.items[0]?.total

    return res(
      ctx.status(200),
      ctx.json({
        error: false,
        bag: mockedBag
      })
    )
  }
)

export const updateBagItemSize = rest.patch(
  `${import.meta.env.VITE_SERVER_URL}/user/bag/size`,
  async (req, res, ctx) => {
    const { size } = await req.json()
    mockedBag.items[0].size = size
    return res(
      ctx.status(200),
      ctx.json({
        error: false,
        bag: mockedBag
      })
    )
  }
)
