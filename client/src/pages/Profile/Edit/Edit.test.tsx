import { screen, waitFor } from '@testing-library/react'
import Edit from './Edit.tsx'
import user from '@testing-library/user-event'
import { renderWithProviders } from '../../../utils/test-utils.tsx'

describe('Edit profile page', () => {
  test('render correctly', async () => {
    renderWithProviders(<Edit />)

    await waitFor(async () => {
      const firstNameElement = screen.getByLabelText(/first name/i)
      const lastNameElement = screen.getByLabelText(/last name/i)
      const addressElement = screen.getByLabelText(/^address$/i)
      const postalCodeElement = screen.getByLabelText(/postal code/i)
      const cityElement = screen.getByLabelText(/^city$/i)
      const stateElement = screen.getByLabelText(/state/i)
      const countryElement = screen.getByLabelText(/country/i)
      const emailElement = screen.getByLabelText(/email/i)
      const phoneNumberElement = screen.getByLabelText(/phone number/i)

      expect(firstNameElement).toBeInTheDocument()
      expect(lastNameElement).toBeInTheDocument()
      expect(addressElement).toBeInTheDocument()
      expect(postalCodeElement).toBeInTheDocument()
      expect(cityElement).toBeInTheDocument()
      expect(stateElement).toBeInTheDocument()
      expect(countryElement).toBeInTheDocument()
      expect(emailElement).toBeInTheDocument()
      expect(phoneNumberElement).toBeInTheDocument()
    })
  })

  test('shipping address work correctly', async () => {
    renderWithProviders(<Edit />)
    user.setup()
    await waitFor(async () => {
      const saveAddressElement = screen.getByTestId(/^save-address-checkbox$/i)
      await user.click(saveAddressElement)
      const submitButton = screen.getByRole('button', { name: /save/i })
      await user.click(submitButton)
    })

    await waitFor(() => {
      expect(screen.getByTestId('address-error')).toBeVisible()
      expect(screen.getByTestId('country-error')).toBeVisible()
      expect(screen.getByTestId('postal-code-error')).toBeVisible()
    })
  })

  test('get user profile', async () => {
    renderWithProviders(<Edit />)

    await waitFor(async () => {
      const firstNameElement = screen.getByLabelText(
        /first name/i
      ) as HTMLInputElement

      const LastNameElement = screen.getByLabelText(
        /last name/i
      ) as HTMLInputElement

      expect(firstNameElement).toHaveValue('test')
      expect(LastNameElement).toHaveValue('test2')
    })
  })

  test('profile update successfully', async () => {
    user.setup()

    const { store } = renderWithProviders(<Edit />)

    await waitFor(async () => {
      const firstNameElement = screen.getByLabelText(/first name/i)
      const lastNameElement = screen.getByLabelText(/last name/i)

      await user.type(firstNameElement, 'test3')
      await user.type(lastNameElement, 'test4')

      const submitButton = screen.getByRole('button', { name: /save/i })
      await user.click(submitButton)
    })

    await waitFor(() => {
      expect(store?.getState().profile.firstName).toBe('test3')
      expect(store?.getState().profile.lastName).toBe('test4')
    })
  })
})
