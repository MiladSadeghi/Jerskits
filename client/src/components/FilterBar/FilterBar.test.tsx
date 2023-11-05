import { render, waitFor, screen } from '@testing-library/react'
import FilterBar from './FilterBar'
import { vi } from 'vitest'
import user from '@testing-library/user-event'

describe('FilterBar', () => {
  window.matchMedia = vi.fn().mockImplementation((query) => {
    return {
      matches: true,
      media: query,
      addListener: vi.fn(),
      removeListener: vi.fn()
    }
  })

  user.setup()
  test('render all filter buttons with correct titles', () => {
    render(<FilterBar applyHandler={vi.fn()} />)
    const priceButton = screen.getByLabelText('Price')
    const colorButton = screen.getByLabelText('Color')
    const sizeButton = screen.getByLabelText('Size')
    const brandButton = screen.getByLabelText('Brand')
    const typeButton = screen.getByLabelText('Type')

    expect(priceButton).toBeInTheDocument()
    expect(colorButton).toBeInTheDocument()
    expect(sizeButton).toBeInTheDocument()
    expect(brandButton).toBeInTheDocument()
    expect(typeButton).toBeInTheDocument()
  })

  test('open modal when filter button is clicked', async () => {
    render(<FilterBar applyHandler={vi.fn()} />)

    const priceButton = screen.getByLabelText('Price')

    user.click(priceButton)
    await waitFor(() => {
      const modalTitle = screen.getByText('Price Range')
      expect(modalTitle).toBeInTheDocument()
    })
  })

  test('render correct filter content in modal based on filter button clicked', async () => {
    render(<FilterBar applyHandler={vi.fn()} />)
    const priceButton = screen.getByLabelText('Price')
    const colorButton = screen.getByLabelText('Color')
    const sizeButton = screen.getByLabelText('Size')
    const brandButton = screen.getByLabelText('Brand')
    const typeButton = screen.getByLabelText('Type')

    await user.click(priceButton)
    await waitFor(() => {
      expect(screen.getByText('Price Range')).toBeInTheDocument()
    })

    await user.click(colorButton)
    await waitFor(() => {
      expect(screen.getByText('Select Color')).toBeInTheDocument()
    })

    await user.click(sizeButton)
    await waitFor(() => {
      expect(screen.getByText('Select Size')).toBeInTheDocument()
    })

    await user.click(brandButton)
    await waitFor(() => {
      expect(screen.getByText('Select Brand')).toBeInTheDocument()
    })

    await user.click(typeButton)
    await waitFor(() => {
      expect(screen.getByText('Select Type')).toBeInTheDocument()
    })
  })

  test('close modal when user clicks outside of it', async () => {
    render(<FilterBar applyHandler={vi.fn()} />)
    const priceButton = screen.getByRole('button', { name: /price/i })
    await user.click(priceButton)

    const priceModal = screen.getByText('Price Range')
    await waitFor(() => {
      expect(priceModal).toBeInTheDocument()
    })
    await user.click(document.body)
    await waitFor(() => {
      expect(priceModal).not.toBeInTheDocument()
    })
  })

  test('render range of prices from props', async () => {
    const price = { minPrice: 10, maxPrice: 50 }
    const setPrice = vi.fn()
    const highestPrice = 100

    render(
      <FilterBar
        price={price}
        setPrice={setPrice}
        highestPrice={highestPrice}
        applyHandler={vi.fn()}
      />
    )

    const priceButton = screen.getByRole('button', { name: /price/i })
    await user.click(priceButton)

    expect(screen.getByText('$10')).toBeInTheDocument()
    expect(screen.getByText('$50')).toBeInTheDocument()
    expect(screen.getByText('$100')).toBeInTheDocument()
  })
})
