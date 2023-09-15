import { render, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../utils/test-utils'
import { Landing } from '..'
import Header from './components/Header'
import { TLandingPageHeaderProduct } from '../../shared/types/LandingPage.types'
import user from '@testing-library/user-event'
import { HeaderSlide } from '../../components'

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

describe('landing page', () => {
  test('Landing page fetch loader', async () => {
    renderWithProviders(<Landing />)
    const skeletonLoader = screen.getByTestId('landingpage-header')
    expect(skeletonLoader).toBeInTheDocument()

    await waitFor(() => {
      expect(skeletonLoader).not.toBeInTheDocument()
    })
  })

  test('Landing page show mock data of header', async () => {
    renderWithProviders(<Landing />)
    await waitFor(() => {
      const slideTitle = screen.getByRole('heading', {
        name: /F.C. Barcelona 2023\/24 Stadium Home/i
      })
      const slideBgImage = screen.getByAltText('Barcelona stadium')
      expect(slideTitle).toBeInTheDocument()
      expect(slideBgImage).toBeInTheDocument()
    })
  })
})

describe('landing page header', () => {
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

  test('change the slide delay when the current slide changes', async () => {
    user.setup()
    renderWithProviders(
      <Header products={headerProducts} isError={false} isLoading={false} />
    )
    const teamNameFirstSlide = screen.getByRole('heading', {
      name: 'Team 1'
    })
    const teamNameSecondSlide = screen.getByRole('heading', {
      name: 'Team 2'
    })

    expect(teamNameFirstSlide).toHaveStyle('width: 0%;')
    expect(teamNameSecondSlide).toHaveStyle('font-size: 48px;')

    const nextSlideButton = screen.getByTestId('next-slide')
    await user.click(nextSlideButton)

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: 'Team 2'
        })
      ).toHaveStyle('font-size: 350px;')
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
