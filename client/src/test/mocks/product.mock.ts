import { rest } from 'msw'
import {
  IProduct,
  TProductResponse,
  TProductsResponse
} from '../../shared/types/Product.types'
import { TReview } from '../../shared/types/Review.types'

export const mockData: IProduct[] = [
  {
    _id: '1',
    name: 'Liverpool',
    brand: 'nike',
    type: 'football',
    size: ['XS', 'M', 'L', 'XL', 'XXL', '3XL'],
    price: 79.95,
    offPrice: 0,
    gender: 'men',
    color: ['red'],
    slug: 'liverpool-fc-2023-24-stadium-home-football-shirt',
    gallery: [''],
    poster:
      'https://s6.uupload.ir/files/liverpool-fc-2023-24-stadium-home-dri-fit-football-shirt-poster_232h.png',
    detail_product: [
      {
        title: 'Detail Product'
      },
      {
        title: 'How This Was Made'
      }
    ]
  },
  {
    _id: '2',
    name: 'Barcelona',
    brand: 'adidas',
    type: 'football',
    size: ['XS', 'S', 'M', 'L', 'XL'],
    price: 124.95,
    offPrice: 0,
    gender: 'women',
    color: ['blue', 'red'],
    slug: 'fc-barcelona-2023-24-match-home',
    gallery: [''],
    detail_product: [
      {
        title: 'Detail Product'
      },
      {
        title: 'How This Was Made'
      }
    ],
    poster: ''
  }
]

const mockReview: TReview[] = [
  {
    _id: '324',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    productId: '2',
    rating: 4,
    text: 'I LIKE IT',
    user: {
      fullName: 'Milad Sadeghi'
    }
  },
  {
    _id: '222',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    productId: '2',
    rating: 2,
    text: 'I NOT LIKE IT',
    user: {
      fullName: 'Rostam Dastan'
    }
  }
]

export const getProducts = rest.get(
  `${import.meta.env.VITE_SERVER_URL}/products`,
  (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<TProductsResponse>({
        error: false,
        products: mockData,
        currentPage: 1,
        totalPages: 3,
        highestPrice: 100
      })
    )
  }
)

export const getProduct = rest.get(
  `${import.meta.env.VITE_SERVER_URL}/products/:slug`,
  (req, res, ctx) => {
    const { slug } = req.params
    const product = mockData.find((product) => product.slug === slug)

    if (product) {
      return res(
        ctx.status(200),
        ctx.json<TProductResponse>({
          error: false,
          product,
          reviews: mockReview
        })
      )
    } else {
      return res(
        ctx.status(404),
        ctx.json<{ error: boolean; message: string }>({
          error: true,
          message:
            "Unfortunately, we couldn't locate the product you were looking for."
        })
      )
    }
  }
)
