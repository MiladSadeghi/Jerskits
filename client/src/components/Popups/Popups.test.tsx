import { vi } from 'vitest'
import { ProfilePopup } from '..'
import { renderWithProviders } from '../../utils/test-utils'
import { screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { createRef } from 'react'
import { setAuthStatus } from '../../App/feature/auth/authSlice'

describe('Popups test', () => {
  const modalRef = createRef<HTMLDialogElement>()
  describe('Profile', () => {
    const handlePopup = vi.fn()

    test('render popup without throwing an error', () => {
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
})
