import { screen, waitFor } from '@testing-library/react'
import { SignIn } from '..'
import user from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { renderWithProviders } from '../../utils/test-utils'

describe('Sign In', () => {
  test('render correctly', () => {
    renderWithProviders(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    )
    const loginElement = screen.getByRole('heading', {
      name: /Welcome to Jerskits/i
    })
    expect(loginElement).toBeInTheDocument()
  })

  test('the form is working correctly', async () => {
    user.setup()
    renderWithProviders(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    )
    const emailInput = screen.getByLabelText(/email/i)
    await user.type(emailInput, 'test')
    const submitButton = screen.getByRole('button', { name: /login/i })
    await user.click(submitButton)
    const emailErrorElement = screen.getByText(/Invalid email/i)
    expect(emailErrorElement).toBeInTheDocument()
  })

  test('fetch access token after sign in', async () => {
    user.setup()
    renderWithProviders(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    )
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/^password$/i)
    const submitButtonElement = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, 'miladsadeghi2323@gmail.com')
    await user.type(passwordInput, '123456')
    await user.click(submitButtonElement)

    await waitFor(() => {
      const regex = /ref=(\w+).*acc=(\w+)/
      const [, refValue, accValue] = document.cookie.match(regex) || []

      expect(refValue).toBe('refreshToken')
      expect(accValue).toBe('accessToken')
    })
  })
})
