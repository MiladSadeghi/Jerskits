import { screen, waitFor } from '@testing-library/react'
import SignUp from './SignUp'
import user from '@testing-library/user-event'
import { renderWithProviders } from '../../utils/test-utils'
import { BrowserRouter } from 'react-router-dom'
import toast from 'react-hot-toast'
import { vi } from 'vitest'

describe('Sign Up', () => {
  test('render without throwing an error', () => {
    renderWithProviders(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
  })

  test('the form working correctly', async () => {
    renderWithProviders(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /CREATE/i })
    await user.type(emailInput, 'testmail@gmail.com')
    await user.click(submitButton)
    const passwordErrorElement = screen.getAllByText(/password is required/i)
    expect(passwordErrorElement.length).toBeGreaterThan(1)
  })

  test('fetching & receive an accessToken after clicking the create account button', async () => {
    renderWithProviders(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    )
    const toastSuccess = vi.spyOn(toast, 'success')

    const emailInput = screen.getByLabelText(/email/i)
    const fullNameInput = screen.getByLabelText(/full name/i)
    const passwordInput = screen.getByLabelText(/^password$/i)
    const confirmPasswordInput = screen.getByLabelText(
      /^confirmation password$/i
    )
    const acceptTermsInput = screen.getByTestId('accept-terms')
    const submitButtonElement = screen.getByRole('button', { name: /create/i })

    await user.type(emailInput, 'miladsadeghi2323@gmail.com')
    await user.type(fullNameInput, 'milad sadeghi')
    await user.type(passwordInput, '123456')
    await user.type(confirmPasswordInput, '123456')
    await user.click(acceptTermsInput)
    await user.click(submitButtonElement)

    await waitFor(() => {
      expect(toastSuccess).toHaveBeenCalled()
      expect(toastSuccess).toHaveBeenCalledWith(
        'thanks for sign up, now you can sign in!'
      )
    })
  })
})
