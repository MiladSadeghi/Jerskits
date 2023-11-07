import { BrowserRouter, MemoryRouter, Route } from 'react-router-dom'
import Product from './Product'
import { renderWithProviders } from '../../utils/test-utils'
import { screen, waitFor } from '@testing-library/react'
import toast from 'react-hot-toast'
import { vi } from 'vitest'

describe('Product', () => {
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
        <Route path='/:slug'>
          <Product />
        </Route>
      </MemoryRouter>
    )

    await waitFor(() => {
      const productName = screen.findByRole('heading', { name: /Barcelona/i })
      const productPrice = screen.findByRole('heading', { name: '124.95' })
      const productType = screen.findByRole('heading', { name: /football/i })

      expect(productName).toBeInTheDocument()
      expect(productPrice).toBeInTheDocument()
      expect(productType).toBeInTheDocument()
    })
  })

  test('returns a error message when the slug does not exist', async () => {
    const slug = 'please-like-my-project-:)'
    const toastError = vi.spyOn(toast, 'error')

    renderWithProviders(
      <MemoryRouter initialEntries={[`/${slug}`]}>
        <Route path='/:slug'>
          <Product />
        </Route>
      </MemoryRouter>
    )

    expect(toastError).toHaveBeenCalled()
    expect(toastError).toHaveBeenCalledWith(
      "Unfortunately, we couldn't locate the product you were looking for."
    )
  })
})
