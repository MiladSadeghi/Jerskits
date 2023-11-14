import { render, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../utils/test-utils'
import Header from './components/Header/Header'
import { TLandingPageHeaderProduct } from '../../shared/types/LandingPage.types'
import { IProduct } from '../../shared/types/Product.types'
import user from '@testing-library/user-event'
import HeaderSlide from './components/Header/HeaderSlide'
import KidCollection from './components/KidCollection/KidCollection'
import { BrowserRouter } from 'react-router-dom'

const headerProducts: TLandingPageHeaderProduct[] = [
  {
    _id: '1',
    stadiumImage: 'stadium1.jpg',
    teamLogo: 'logo1.jpg',
    posterTitle: 'Poster 1',
    teamName: 'Team 1',
    howWasMade: 'Made by Team 1',
    posterDescription: 'Description 1',
    kitLogo: 'kit1.jpg',
    brand: 'nike',
    color: ['red', 'blue'],
    gender: 'men',
    name: 'Name 1',
    price: 0,
    size: ['XS'],
    slug: 'Slug 1',
    type: 'basketball',
    detail_product: [],
    offPrice: 0,
    poster: '',
    gallery: []
  },
  {
    _id: '2',
    stadiumImage: 'stadium2.jpg',
    teamLogo: 'logo2.jpg',
    posterTitle: 'Poster 2',
    teamName: 'Team 2',
    howWasMade: 'Made by Team 2',
    posterDescription: 'Description 2',
    kitLogo: 'kit2.jpg',
    brand: 'nike',
    color: ['red', 'blue'],
    gender: 'men',
    name: 'Name 2',
    price: 0,
    size: ['XS'],
    slug: 'Slug-2',
    type: 'football',
    detail_product: [],
    offPrice: 0,
    poster: '',
    gallery: []
  }
]

describe('landing page header', () => {
  user.setup()
  test('render without error or loading', async () => {
    renderWithProviders(
      <Header products={headerProducts} isError={false} isLoading={false} />
    )

    await waitFor(() => {
      const howWasMade = screen.getAllByText(/Made by Team/i)
      const skeletonLoader = screen.queryByTestId('landingpage-header')
      expect(howWasMade).toHaveLength(headerProducts.length)
      expect(skeletonLoader).not.toBeInTheDocument()
    })
  })

  test('render with error', () => {
    renderWithProviders(
      <Header products={headerProducts} isError={true} isLoading={false} />
    )
    const skeletonLoader = screen.queryByTestId('landingpage-header')
    expect(skeletonLoader).toBeInTheDocument()
  })
})

describe('Landing page header slide', () => {
  const headerMockProduct: TLandingPageHeaderProduct = {
    _id: '3',
    stadiumImage: 'Mock.jpg',
    teamLogo: 'Mock.jpg',
    posterTitle: 'Mock',
    teamName: 'Mock Team',
    howWasMade: 'Made by Mock',
    posterDescription: 'Description Mock',
    kitLogo: 'Mock Kit.jpg',
    brand: 'nike',
    color: ['black', 'white'],
    gender: 'kid',
    name: 'Mock',
    price: 0,
    size: ['XS'],
    slug: 'Slug 1',
    type: 'football',
    detail_product: [],
    offPrice: 0,
    poster: '',
    gallery: []
  }

  test('display the correct team name, logo and kit', () => {
    render(
      <HeaderSlide product={headerMockProduct} currentSlide={0} index={0} />
    )
    expect(screen.getByText(headerMockProduct.teamName)).toBeInTheDocument()
    expect(
      screen.getByAltText(`${headerMockProduct.teamName} logo`)
    ).toBeInTheDocument()
    expect(
      screen.getByAltText(`${headerMockProduct.teamName} kit`)
    ).toBeInTheDocument()
  })

  test('handle currentSlide greater than index', async () => {
    render(
      <HeaderSlide product={headerMockProduct} currentSlide={0} index={1} />
    )

    const teamName = screen.getByText(/Mock Team/i)
    expect(teamName).toHaveStyle('font-size: 48px;')

    await waitFor(() => {
      expect(teamName).toHaveStyle('font-size: 48px;')
    })
  })
})

describe('landing page kid collection', () => {
  const kidsCollectionMockProducts: IProduct[] = [
    {
      _id: '1',
      name: 'Jordan1',
      brand: 'nike',
      type: 'basketball',
      size: ['5'],
      price: 55,
      offPrice: 46.97,
      gender: 'kid',
      color: ['red'],
      slug: 'jordan-23-jersey',
      gallery: [
        'https://s21.uupload.ir/files/miladsdgh/jerskits/Jordan%2023%20Jersey%20-%20kid/f607022f-ffec-442c-a199-ae51721ab77f.webp'
      ],
      detail_product: [
        {
          title: 'Product Details',
          description:
            'Kiddos can wear the jersey with the name and number of one of the best to ever play the game, Michael Jordan. This jersey is made of breathable mesh fabric and is great for a pick-up game with friends or styled with a pair of jeans.',
          specification: ['Shown: White', 'Style: 85A773-001']
        }
      ]
    },
    {
      _id: '2',
      name: 'Jordan2',
      brand: 'nike',
      type: 'basketball',
      size: ['5'],
      price: 55,
      offPrice: 46.97,
      gender: 'kid',
      color: ['red'],
      slug: 'jordan-23-jersey',
      gallery: [
        'https://s21.uupload.ir/files/miladsdgh/jerskits/Jordan%2023%20Jersey%20-%20kid/f607022f-ffec-442c-a199-ae51721ab77f.webp'
      ],
      detail_product: [
        {
          title: 'Product Details',
          description:
            'Kiddos can wear the jersey with the name and number of one of the best to ever play the game, Michael Jordan. This jersey is made of breathable mesh fabric and is great for a pick-up game with friends or styled with a pair of jeans.',
          specification: ['Shown: White', 'Style: 85A773-001']
        }
      ]
    }
  ]

  test('render without error', async () => {
    renderWithProviders(
      <BrowserRouter>
        <KidCollection
          products={kidsCollectionMockProducts}
          isError={false}
          isLoading={false}
        />
      </BrowserRouter>
    )
  })

  test('content change when click on the data controller', async () => {
    user.setup()
    renderWithProviders(
      <BrowserRouter>
        <KidCollection
          products={kidsCollectionMockProducts}
          isError={false}
          isLoading={false}
        />
      </BrowserRouter>
    )
    await waitFor(async () => {
      const nikeProducts = await screen.findAllByAltText('nike logo')
      expect(nikeProducts.length).toBeGreaterThan(1)
    })

    await waitFor(async () => {
      const changeContentButton = screen.getByAltText('jordan')
      await user.click(changeContentButton)
    })

    await waitFor(async () => {
      const jordanProducts = await screen.findAllByAltText('jordan logo')
      expect(jordanProducts.length).toBeGreaterThan(1)
    })
  })
})
