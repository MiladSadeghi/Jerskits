import { rest } from 'msw'
import { IProduct, TProductsResponse } from '../../shared/types/Product.types'

const mockData: IProduct[] = [
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

export const getProducts = rest.get(
  `http://localhost:3001/api/products`,
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
