import { BrowserRouter } from 'react-router-dom'
import { renderWithProviders } from '../../../utils/test-utils'
import Favorites from './Favorites'
import { waitFor, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { vi } from 'vitest'

describe('Favorites', () => {
  user.setup()
  const successToast = vi.spyOn(toast, 'success')
  test('render without throwing an error', () => {
    renderWithProviders(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    )
  })

  test('render mocked favorites products', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    )

    await waitFor(() => {
      const products = screen.getAllByTestId('favorite-product')
      expect(products.length).toBe(2)

      const firstProductTeamName = screen.getByRole('heading', {
        name: /liverpool/i
      })
      const secondProductTeamName = screen.getByRole('heading', {
        name: /barcelona/i
      })

      expect(firstProductTeamName).toBeInTheDocument()
      expect(secondProductTeamName).toBeInTheDocument()
    })
  })

  test('render empty favorites products', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    )

    await waitFor(() => {
      const products = screen.getAllByTestId('favorite-product')
      expect(products.length).toBe(0)

      const message = screen.getByText(/No favorites yet/i)
      expect(message).toBeInTheDocument()
    })
  })

  test('remove favorite product', async () => {
    const { store } = renderWithProviders(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    )

    await waitFor(async () => {
      const product = screen.getByRole('heading', { name: /liverpool/i })
      await user.hover(product)

      const likeButton = screen.getByRole('button', { name: /like-liverpool/i })
      await user.click(likeButton)
    })

    await waitFor(async () => {
      const isProductInFavorites = store
        .getState()
        .user.favorites.some((favorite) => {
          return favorite._id === '1'
        })

      expect(isProductInFavorites).toBe(false)
    })

    await waitFor(() => {
      expect(successToast).toHaveBeenCalled()
      expect(successToast).toHaveBeenCalledWith(
        'Product removed from favorites'
      )
    })
  })
})
