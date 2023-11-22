import { BrowserRouter } from 'react-router-dom'
import { renderWithProviders } from '../../../utils/test-utils'
import Favorites from './Favorites'
import { waitFor, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import toast from 'react-hot-toast'
import { vi } from 'vitest'
import { server } from '../../../test/setup'
import { rest } from 'msw'

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

      const firstProductTeamName = screen.getByRole('link', {
        name: /liverpool/i
      })
      const secondProductTeamName = screen.getByRole('link', {
        name: /barcelona/i
      })

      expect(firstProductTeamName).toBeInTheDocument()
      expect(secondProductTeamName).toBeInTheDocument()
    })
  })

  test('render empty favorites products', async () => {
    server.use(
      rest.get(
        `${import.meta.env.VITE_SERVER_URL}/user/favorites`,
        (_req, res, ctx) => {
          return res(
            ctx.status(200),
            ctx.json({
              error: false,
              favorites: []
            })
          )
        }
      )
    )
    renderWithProviders(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    )

    await waitFor(() => {
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
      const likeButton = screen.getByRole('button', { name: /like-liverpool/i })
      await user.click(likeButton)
    })

    await waitFor(async () => {
      const isProductInFavorites = store
        .getState()
        .user.favorites.some((product) => product._id === '1')

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
