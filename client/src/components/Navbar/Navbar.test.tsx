import { screen, waitFor } from '@testing-library/react'
import Navbar from './Navbar'
import { BrowserRouter as Router } from 'react-router-dom'
import { renderWithProviders } from '../../utils/test-utils'
import { server } from '../../test/setup'
import { rest } from 'msw'
import { setAuthStatus } from '../../App/feature/auth/authSlice'
import { setProfile } from '../../App/feature/profile/profileSlice'

describe('Navbar', () => {
  test('elements render correctly', async () => {
    server.use(
      rest.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/refresh`,
        (_, res, ctx) => {
          return res(ctx.status(401))
        }
      )
    )
    renderWithProviders(
      <Router>
        <Navbar />
      </Router>
    )
    const homeElement = screen.getByAltText('Home')
    const menElement = screen.getByRole('link', { name: 'Men' })
    const womenElement = screen.getByRole('link', { name: 'Women' })
    const kidsElement = screen.getByRole('link', { name: 'Kids' })
    const searchElement = screen.getByRole('button', {
      name: 'search'
    })
    const bagListElement = screen.getByRole('button', {
      name: 'bag'
    })
    const favoriteListElement = screen.getByRole('button', {
      name: 'favorite'
    })

    await waitFor(() => {
      expect(homeElement).toBeInTheDocument()
      expect(menElement).toBeInTheDocument()
      expect(womenElement).toBeInTheDocument()
      expect(kidsElement).toBeInTheDocument()
      expect(searchElement).toBeInTheDocument()
      expect(bagListElement).toBeInTheDocument()
      expect(favoriteListElement).toBeInTheDocument()
      const signInLink = screen.getByRole('link', { name: 'Sign In' })
      expect(signInLink.closest('a')).toHaveAttribute('href', '/sign-in')
    })
  })

  test('links render correctly', async () => {
    server.use(
      rest.get(
        `${import.meta.env.VITE_SERVER_URL}/auth/refresh`,
        (_, res, ctx) => {
          return res(ctx.status(401))
        }
      )
    )
    renderWithProviders(
      <Router>
        <Navbar />
      </Router>
    )
    const homeLink = screen.getByAltText(/home/i)
    const menLink = screen.getByRole('link', { name: 'Men' })
    const womenLink = screen.getByRole('link', { name: 'Women' })
    const kidsLink = screen.getByRole('link', { name: 'Kids' })

    await waitFor(() => {
      expect(homeLink.closest('a')).toHaveAttribute('href', '/')
      expect(menLink.closest('a')).toHaveAttribute('href', '/men')
      expect(womenLink.closest('a')).toHaveAttribute('href', '/women')
      expect(kidsLink.closest('a')).toHaveAttribute('href', '/kid')
      const signInLink = screen.getByRole('link', { name: 'Sign In' })
      expect(signInLink.closest('a')).toHaveAttribute('href', '/sign-in')
    })
  })

  test('navbar work correctly after login', async () => {
    const { store } = renderWithProviders(
      <Router>
        <Navbar />
      </Router>
    )

    await waitFor(() => {
      store.dispatch(setAuthStatus(true))
      store.dispatch(setProfile({ firstName: 'milad' }))
      const signInLink = screen.queryByText(/sign in/i)
      if (store.getState().auth) {
        expect(signInLink).not.toBeInTheDocument()
        expect(screen.getByText(/hi, milad/i)).toBeInTheDocument()
      } else {
        expect(signInLink).toBeInTheDocument()
        expect(screen.getByText(/hi, milad/i)).toBeInTheDocument()
      }
    })
  })
})
