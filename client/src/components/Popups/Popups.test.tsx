import { vi } from 'vitest'
import { ProfilePopup } from '..'
import { renderWithProviders } from '../../utils/test-utils'
import { screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { createRef } from 'react'
import { setAuthStatus } from '../../App/feature/auth/authSlice'
import { setFavorites } from '../../App/feature/userSlice'
import { IProduct } from '../../shared/types/Product.types'
import FavoritesPopup from './FavoritesPopup'
import { act } from 'react-dom/test-utils'

describe('Popups test', () => {
  const modalRef = createRef<HTMLDialogElement>()
  const handlePopup = vi.fn()
  describe('Profile', () => {
    test('render profile popup without throwing an error', () => {
      const { store } = renderWithProviders(
        <BrowserRouter>
          <ProfilePopup isOpen={true} handlePopup={vi.fn()} ref={modalRef} />
        </BrowserRouter>
      )

      store.dispatch(setAuthStatus(true))

      expect(screen.getByAltText('user-avatar')).toHaveAttribute(
        'src',
        '/images/blank-profile-picture.png'
      )
    })

    test('render popup and display user information and links', async () => {
      renderWithProviders(
        <BrowserRouter>
          <ProfilePopup
            isOpen={true}
            handlePopup={handlePopup}
            ref={modalRef}
          />
        </BrowserRouter>
      )

      expect(screen.getByText(/hi,/i)).toBeInTheDocument()
      expect(screen.getByText(/edit account/i)).toBeInTheDocument()
      expect(screen.getByText(/orders/i)).toBeInTheDocument()
      expect(screen.getByText(/favorites/i)).toBeInTheDocument()
      expect(screen.getByText(/setting/i)).toBeInTheDocument()
    })

    test('display default image when user has no avatar', () => {
      renderWithProviders(
        <BrowserRouter>
          <ProfilePopup
            isOpen={true}
            handlePopup={handlePopup}
            ref={modalRef}
          />
        </BrowserRouter>
      )
    })

    test('render closed by default when isOpen is false', async () => {
      renderWithProviders(
        <BrowserRouter>
          <ProfilePopup
            isOpen={false}
            handlePopup={handlePopup}
            ref={modalRef}
          />
        </BrowserRouter>
      )
      const popupModal = await screen.findByTestId('profile-popup')
      expect(popupModal.className.includes('hidden')).toBe(true)
    })
  })

  describe('Favorites', () => {
    const favoritesProduct: IProduct[] = [
      {
        _id: '1',
        brand: 'nike',
        color: ['black'],
        gallery: [],
        name: 'product 1',
        gender: 'kid',
        offPrice: 0,
        price: 100,
        size: ['M', 'S'],
        slug: 'product-1',
        type: 'basketball',
        detail_product: [],
        poster: ''
      },
      {
        _id: '2',
        brand: 'nike',
        color: ['black'],
        gallery: [],
        name: 'product 2',
        gender: 'kid',
        offPrice: 0,
        price: 120,
        size: ['L', 'XL'],
        slug: 'product-2',
        type: 'football',
        detail_product: [],
        poster: ''
      },
      {
        _id: '3',
        brand: 'adidas',
        color: ['red'],
        gallery: [],
        name: 'product 3',
        gender: 'kid',
        offPrice: 0,
        price: 88,
        size: ['2XL', '3XL'],
        slug: 'product-3',
        type: 'football',
        detail_product: [],
        poster: ''
      }
    ]
    test('render favorites popup without throwing an error', () => {
      renderWithProviders(
        <BrowserRouter>
          <ProfilePopup
            isOpen={true}
            handlePopup={handlePopup}
            ref={modalRef}
          />
        </BrowserRouter>
      )
    })

    test('display the correct number of favorite products on the favorites page', async () => {
      const { store } = renderWithProviders(
        <BrowserRouter>
          <FavoritesPopup
            isOpen={true}
            handlePopup={handlePopup}
            ref={modalRef}
          />
        </BrowserRouter>
      )

      act(() => {
        store.dispatch(setFavorites(favoritesProduct))
      })

      await waitFor(() => {
        expect(screen.getByText(/VIEW FAVORITES \(3\)/i)).toBeInTheDocument()
      })
    })

    test('display a list of favorite products', async () => {
      const { store } = renderWithProviders(
        <BrowserRouter>
          <FavoritesPopup
            isOpen={true}
            handlePopup={handlePopup}
            ref={modalRef}
          />
        </BrowserRouter>
      )

      act(() => {
        store.dispatch(setFavorites(favoritesProduct))
      })

      await waitFor(() => {
        expect(screen.getByText(/product 1/i)).toBeInTheDocument()
        expect(screen.getByText(/product 2/i)).toBeInTheDocument()
        expect(screen.getByText(/product 3/i)).toBeInTheDocument()
      })
    })

    test('display a message when there are no favorite products', async () => {
      renderWithProviders(
        <BrowserRouter>
          <FavoritesPopup
            isOpen={true}
            handlePopup={handlePopup}
            ref={modalRef}
          />
        </BrowserRouter>
      )

      await waitFor(() => {
        expect(screen.getByText(/No favorites yet/i)).toBeInTheDocument()
      })
    })

    test('should hide the dialog when isOpen is false', () => {
      renderWithProviders(
        <BrowserRouter>
          <FavoritesPopup
            isOpen={false}
            handlePopup={handlePopup}
            ref={modalRef}
          />
        </BrowserRouter>
      )

      const favoritesPopup = screen.getByTestId('favorites-popup')
      expect(favoritesPopup.className.includes('hidden')).toBe(true)
    })
  })
})
