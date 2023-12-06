import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import Product from './Product'
import { renderWithProviders } from '../../utils/test-utils'
import { screen, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'
import { vi } from 'vitest'
import user from '@testing-library/user-event'
import { setAuthStatus } from '../../App/feature/auth/authSlice'
import { addToFavorites } from '../../App/feature/userSlice'
import { mockData } from '../../test/mocks/product.mock'

describe('Product', () => {
  user.setup()
  const toastSuccess = vi.spyOn(toast, 'success')
  const toastError = vi.spyOn(toast, 'error')
  test('render without throwing an error', () => {
    renderWithProviders(
      <BrowserRouter>
        <Product />
      </BrowserRouter>
    )
  })

  test('returns a product when the slug exists', async () => {
    const slug = 'fc-barcelona-2023-24-match-home'
    renderWithProviders(
      <MemoryRouter initialEntries={[`/${slug}`]}>
        <Routes>
          <Route path='/:slug' element={<Product />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      const productName = screen.getByRole('heading', { name: /Barcelona/i })
      const productPrice = screen.getByRole('heading', { name: '$124.95' })
      const productType = screen.getByRole('heading', { name: /football/i })

      expect(productName).toBeInTheDocument()
      expect(productPrice).toBeInTheDocument()
      expect(productType).toBeInTheDocument()
    })
  })

  test('returns a error message when the slug does not exist', async () => {
    const slug = 'please-like-my-project-:)'

    renderWithProviders(
      <MemoryRouter initialEntries={[`/${slug}`]}>
        <Routes>
          <Route path='/:slug' element={<Product />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(toastError).toHaveBeenCalled()
      expect(toastError).toHaveBeenCalledWith(
        "Unfortunately, we couldn't locate the product you were looking for."
      )
    })
  })

  test('display product reviews', async () => {
    const slug = 'fc-barcelona-2023-24-match-home'
    renderWithProviders(
      <MemoryRouter initialEntries={[`/${slug}`]}>
        <Routes>
          <Route path='/:slug' element={<Product />} />
        </Routes>
      </MemoryRouter>
    )

    await waitFor(async () => {
      const reviewsAccordion = screen.getByRole('heading', { name: /Review/i })
      await user.click(reviewsAccordion)

      const reviewElements = screen.getAllByTestId('review')
      expect(reviewElements.length).toBe(2)

      expect(reviewElements[0]).toHaveTextContent('I LIKE IT')
      expect(reviewElements[1]).toHaveTextContent('I NOT LIKE IT')
    })
  })

  test('submit review and display it', async () => {
    const slug = 'fc-barcelona-2023-24-match-home'
    const { store } = renderWithProviders(
      <MemoryRouter initialEntries={[`/${slug}`]}>
        <Routes>
          <Route path='/:slug' element={<Product />} />
        </Routes>
      </MemoryRouter>
    )

    store.dispatch(setAuthStatus(true))

    await waitFor(async () => {
      const reviewElement = screen.getByLabelText('Review')
      await user.type(reviewElement, 'very good product')

      const ratingElements = screen.getAllByTestId('rating')
      await user.click(ratingElements[4])

      const submitReviewBtn = screen.getByRole('button', { name: /submit/i })
      await user.click(submitReviewBtn)
    })

    await waitFor(async () => {
      expect(toastSuccess).toHaveBeenCalled()
      expect(toastSuccess).toHaveBeenCalledWith('Review submitted')
    })
  })

  test('add product to favorite', async () => {
    const slug = 'fc-barcelona-2023-24-match-home'
    const { store } = renderWithProviders(
      <MemoryRouter initialEntries={[`/${slug}`]}>
        <Routes>
          <Route path='/:slug' element={<Product />} />
        </Routes>
      </MemoryRouter>
    )

    store.dispatch(setAuthStatus(true))
    await waitFor(async () => {
      const likeButton = screen.getByRole('button', { name: /FAVORITE/i })
      await user.click(likeButton)
      expect(toastSuccess).toHaveBeenCalled()
      expect(toastSuccess).toHaveBeenCalledWith('Product added to favorites')
      const isProductInFavorites = store
        .getState()
        .user.favorites?.some((product) => product?._id === '2')
      expect(isProductInFavorites).toBe(true)
    })
  })

  test('remove product from favorite', async () => {
    const slug = 'fc-barcelona-2023-24-match-home'
    const { store } = renderWithProviders(
      <MemoryRouter initialEntries={[`/${slug}`]}>
        <Routes>
          <Route path='/:slug' element={<Product />} />
        </Routes>
      </MemoryRouter>
    )
    const product = mockData.find((product) => product.slug === slug)
    store.dispatch(setAuthStatus(true))
    if (product) {
      store.dispatch(addToFavorites(product))
    }

    await waitFor(async () => {
      const likeButton = screen.getByRole('button', { name: /FAVORITE/i })
      await user.click(likeButton)
      expect(toastSuccess).toHaveBeenCalled()
      expect(toastSuccess).toHaveBeenCalledWith(
        'Product removed from favorites'
      )
      const isProductInFavorites = store
        .getState()
        .user.favorites?.some((product) => product?._id === '2')
      expect(isProductInFavorites).toBe(false)
    })
  })

  test('add product to bag', async () => {
    const slug = 'fc-barcelona-2023-24-match-home'
    const { store } = renderWithProviders(
      <MemoryRouter initialEntries={[`/${slug}`]}>
        <Routes>
          <Route path='/:slug' element={<Product />} />
        </Routes>
      </MemoryRouter>
    )

    store.dispatch(setAuthStatus(true))

    await waitFor(async () => {
      const sizeButton = screen.getByRole('button', { name: 'size-M' })
      await user.click(sizeButton)
      const addToBagButton = screen.getByRole('button', {
        name: /add product to bag/i
      })
      await user.click(addToBagButton)
    })

    await waitFor(async () => {
      expect(toastSuccess).toHaveBeenCalled()
      expect(toastSuccess).toHaveBeenCalledWith('Product added to bag')
      const isProductInBag = store
        .getState()
        .user.bag?.items.some((product) => product.product._id === '2')
      expect(isProductInBag).toBe(true)
    })
  })
})
