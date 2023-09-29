import { screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { renderWithProviders } from '../../utils/test-utils'
import { AuthenticationLayout } from '..'
import SignIn from '../../pages/SignIn/SignIn'

describe('Authentication Layout', () => {
  test('children props work', async () => {
    renderWithProviders(
      <BrowserRouter>
        <AuthenticationLayout children={<SignIn />} />
      </BrowserRouter>
    )
    await waitFor(() => {
      const signInElement = screen.getByRole('heading', {
        name: /Welcome to Jerskits/i
      })
      expect(signInElement).toBeInTheDocument()
    })
  })
})
