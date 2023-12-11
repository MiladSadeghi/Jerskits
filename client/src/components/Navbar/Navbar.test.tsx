import { screen, waitFor } from '@testing-library/react'
import Navbar from './Navbar'
import { BrowserRouter } from 'react-router-dom'
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
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )
    const homeElement = screen.getByAltText('Home')
    const menElements = screen.getAllByRole('link', { name: 'Men' })
    const womenElements = screen.getAllByRole('link', { name: 'Women' })
    const kidsElements = screen.getAllByRole('link', { name: 'Kids' })
    const searchElement = screen.getByRole('button', {
      name: 'open search modal'
    })
    const bagListElement = await screen.findByLabelText('open bag popup')
    const favoriteListElement = await screen.findByLabelText(
      'open favorites popup'
    )

    await waitFor(() => {
      expect(homeElement).toBeInTheDocument()
      expect(menElements.length).toBe(2)
      expect(womenElements.length).toBe(2)
      expect(kidsElements.length).toBe(2)
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
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )
    const homeLinks = screen.getAllByAltText(/home/i)
    const menLinks = screen.getAllByRole('link', { name: 'Men' })
    const womenLinks = screen.getAllByRole('link', { name: 'Women' })
    const kidsLinks = screen.getAllByRole('link', { name: 'Kids' })

    await waitFor(() => {
      expect(homeLinks[0].closest('a')).toHaveAttribute('href', '/')
      expect(menLinks[0].closest('a')).toHaveAttribute('href', '/men')
      expect(womenLinks[0].closest('a')).toHaveAttribute('href', '/women')
      expect(kidsLinks[0].closest('a')).toHaveAttribute('href', '/kid')
      const signInLink = screen.getByRole('link', { name: 'Sign In' })
      expect(signInLink.closest('a')).toHaveAttribute('href', '/sign-in')
    })
  })

  test('navbar work correctly after login', async () => {
    const { store } = renderWithProviders(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )

    await waitFor(async () => {
      store.dispatch(setAuthStatus(true))
      store.dispatch(setProfile({ firstName: 'milad' }))

      const signInLink = await screen.findByRole('link', { name: /Sign In/i })

      // "milad" return by mocked endpoint and showed in profile popup and navbar menu in mobile devices
      const userName = await screen.findAllByText(/hi, milad/i)

      expect(signInLink).not.toBeInTheDocument()
      expect(userName.length).toBe(2)
    })
  })
})
