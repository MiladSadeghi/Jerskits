import { vi } from 'vitest'
import { ProfilePopup } from '..'
import { renderWithProviders } from '../../utils/test-utils'
import { screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { createRef } from 'react'
import { setAuthStatus } from '../../App/feature/auth/authSlice'
import { setBag, setFavorites } from '../../App/feature/userSlice'
import { IProduct } from '../../shared/types/Product.types'
import FavoritesPopup from './FavoritesPopup'
import { act } from 'react-dom/test-utils'
import BagPopup from './BagPopup'
import { TBag } from '../../shared/types/User.types'
import user from '@testing-library/user-event'

const mockProducts: IProduct[] = [
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

describe('Popups test', () => {
  user.setup()
  const modalRef = createRef<HTMLDialogElement>()
  const handlePopup = vi.fn()
  describe('Profile', () => {
    test('render profile popup without throwing an error', () => {
      const { store } = renderWithProviders(
        <BrowserRouter>
          <ProfilePopup isOpen={true} closePopup={vi.fn()} ref={modalRef} />
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
          <ProfilePopup isOpen={true} closePopup={handlePopup} ref={modalRef} />
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
          <ProfilePopup isOpen={true} closePopup={handlePopup} ref={modalRef} />
        </BrowserRouter>
      )
    })

    test('render closed by default when isOpen is false', async () => {
      renderWithProviders(
        <BrowserRouter>
          <ProfilePopup
            isOpen={false}
            closePopup={handlePopup}
            ref={modalRef}
          />
        </BrowserRouter>
      )
      const popupModal = await screen.findByTestId('profile-popup')
      expect(popupModal.className.includes('hidden')).toBe(true)
    })
  })

  describe('Favorites', () => {
    test('render favorites popup without throwing an error', () => {
      renderWithProviders(
        <BrowserRouter>
          <ProfilePopup isOpen={true} closePopup={handlePopup} ref={modalRef} />
        </BrowserRouter>
      )
    })

    test('display the correct number of favorite products on the favorites page', async () => {
      const { store } = renderWithProviders(
        <BrowserRouter>
          <FavoritesPopup
            isOpen={true}
            closePopup={handlePopup}
            ref={modalRef}
          />
        </BrowserRouter>
      )

      act(() => {
        store.dispatch(setFavorites(mockProducts))
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
            closePopup={handlePopup}
            ref={modalRef}
          />
        </BrowserRouter>
      )

      act(() => {
        store.dispatch(setFavorites(mockProducts))
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
            closePopup={handlePopup}
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
            closePopup={handlePopup}
            ref={modalRef}
          />
        </BrowserRouter>
      )

      const favoritesPopup = screen.getByTestId('favorites-popup')
      expect(favoritesPopup.className.includes('hidden')).toBe(true)
    })

    describe('Bag', () => {
      const handleBagModal = vi.fn()
      const userBag: TBag = {
        _id: '243',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        user: '1',
        subTotal: 340,
        items: [
          {
            _id: '11',
            product: mockProducts[0],
            price: 100,
            quantity: 1,
            size: 'M',
            total: 100
          },
          {
            _id: '12',
            product: mockProducts[1],
            price: 120,
            quantity: 2,
            size: 'S',
            total: 240
          }
        ]
      }
      test('render bag popup without throwing an error', () => {
        renderWithProviders(
          <BrowserRouter>
            <BagPopup
              isOpen={true}
              closePopup={handlePopup}
              ref={modalRef}
              handleBagModal={handleBagModal}
            />
          </BrowserRouter>
        )
      })

      test('display the correct number of items in the bag', async () => {
        const { store } = renderWithProviders(
          <BrowserRouter>
            <BagPopup
              isOpen={true}
              closePopup={handlePopup}
              ref={modalRef}
              handleBagModal={handleBagModal}
            />
          </BrowserRouter>
        )
        act(() => {
          store.dispatch(setBag(userBag))
        })

        await waitFor(() => {
          expect(
            screen.getByRole('link', { name: /product 1/i })
          ).toBeInTheDocument()

          expect(
            screen.getByRole('link', { name: /product 2/i })
          ).toBeInTheDocument()
        })
      })

      test('render the correct product information for each item in the bag', async () => {
        const { store } = renderWithProviders(
          <BrowserRouter>
            <BagPopup
              isOpen={true}
              closePopup={handlePopup}
              ref={modalRef}
              handleBagModal={handleBagModal}
            />
          </BrowserRouter>
        )
        act(() => {
          store.dispatch(setBag(userBag))
        })

        await waitFor(() => {
          expect(screen.getByText(/product 1/i)).toBeInTheDocument()
          expect(screen.getByText(/product 2/i)).toBeInTheDocument()
          expect(screen.getByText(/\$100/i)).toBeInTheDocument()
          expect(screen.getByText(/\$120/i)).toBeInTheDocument()
          expect(screen.getByText(/football/i)).toBeInTheDocument()
          expect(screen.getByText(/basketball/i)).toBeInTheDocument()
          expect(screen.getByText(/Size M/i)).toBeInTheDocument()
          expect(screen.getByText(/Size S/i)).toBeInTheDocument()
        })
      })

      test('view bag button should disabled when bag item is empty', async () => {
        renderWithProviders(
          <BrowserRouter>
            <BagPopup
              isOpen={true}
              closePopup={handlePopup}
              ref={modalRef}
              handleBagModal={handleBagModal}
            />
          </BrowserRouter>
        )

        await waitFor(() => {
          expect(
            screen.getByRole('button', { name: /VIEW BAG/i })
          ).toBeDisabled()
        })
      })

      test('open bag modal when click on the view bag button', async () => {
        const { store } = renderWithProviders(
          <BrowserRouter>
            <BagPopup
              isOpen={true}
              closePopup={handlePopup}
              ref={modalRef}
              handleBagModal={handleBagModal}
            />
          </BrowserRouter>
        )

        act(() => {
          store.dispatch(setBag(userBag))
        })

        await waitFor(() => {
          expect(
            screen.getByRole('button', { name: /VIEW BAG/i })
          ).not.toBeDisabled()

          user.click(screen.getByRole('button', { name: /VIEW BAG/i }))

          expect(handleBagModal).toHaveBeenCalled()
          expect(handleBagModal).toHaveBeenCalledWith(true)
        })
      })
    })
  })
})
