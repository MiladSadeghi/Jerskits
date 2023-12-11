import { screen } from '@testing-library/react'
import SignIn from './SignIn'
import user from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { renderWithProviders } from '../../utils/test-utils'

describe('Sign In', () => {
  user.setup()
  test('render without throwing an error', async () => {
    renderWithProviders(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    )
  })

  test('form will show error if email is not valid', async () => {
    renderWithProviders(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    )

    const emailInput = screen.getByLabelText(/Email/i)
    const submitButton = screen.getByRole('button', { name: /login/i })

    await user.type(emailInput, 'test')
    await user.click(submitButton)

    const emailErrorElement = screen.getByText(/Invalid email/i)
    expect(emailErrorElement).toBeInTheDocument()
  })

  test('fetch access token after sign in', async () => {
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

    const regex = /ref=(\w+).*acc=(\w+)/
    const [, refValue, accValue] = document.cookie.match(regex) || []
    expect(refValue).toBe('refreshToken')
    expect(accValue).toBe('accessToken')
  })
})
