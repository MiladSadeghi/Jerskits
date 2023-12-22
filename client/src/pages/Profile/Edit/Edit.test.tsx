import { screen, waitFor } from '@testing-library/react'
import Edit from './Edit.tsx'
import user from '@testing-library/user-event'
import { renderWithProviders } from '../../../utils/test-utils.tsx'

describe('Edit profile page', () => {
  user.setup()

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
