import { render, waitFor, screen } from '@testing-library/react'
import FilterBar from './FilterBar'
import { vi } from 'vitest'
import user from '@testing-library/user-event'

describe('FilterBar', () => {
  test('render filter bar item for available props', async () => {
    render(
      <FilterBar price={{ minPrice: 0, maxPrice: 100 }} setPrice={vi.fn()} />
    )

    await waitFor(() => {
      const filterBarItem = screen.getByText('price')
      expect(filterBarItem).toBeInTheDocument()
    })
  })

  test('updates price when input fields change', () => {
    const setPrice = vi.fn()
    user.setup()
    render(
      <FilterBar price={{ minPrice: 0, maxPrice: 100 }} setPrice={setPrice} />
    )

    const minPriceInput = screen.getByLabelText(/lowest/i)
    const maxPriceInput = screen.getByLabelText(/highest/i)

    user.type(minPriceInput, '50')
    user.type(maxPriceInput, '200')

    expect(setPrice).toHaveBeenCalledWith({ minPrice: 50, maxPrice: 200 })
  })

  test('calls setColor when color is selected', async () => {
    user.setup()
    const setColor = vi.fn()
    render(<FilterBar color='red' setColor={setColor} />)

    await waitFor(async () => {
      const colorFilterElement = screen.getByTestId('filter-bar-color')
      await user.click(colorFilterElement)

      const colorRedItem = screen.getByTestId('filter-bar-color-red-item')

      await user.click(colorRedItem)
      expect(setColor).toHaveBeenCalledWith('red')
    })
  })

  test('calls setSize when size is selected', async () => {
    user.setup()
    const setSize = vi.fn()
    render(<FilterBar size='XS' setSize={setSize} />)

    await waitFor(async () => {
      const sizeFilterElement = screen.getByTestId('filter-bar-size')
      await user.click(sizeFilterElement)

      const sizeXSItem = screen.getByTestId('filter-bar-size-XS-item')

      await user.click(sizeXSItem)
      expect(sizeXSItem).toHaveBeenCalledWith('xs')
    })
  })

  test('calls setBrand when brand is selected', async () => {
    user.setup()
    const setBrand = vi.fn()
    render(<FilterBar brand='jordan' setBrand={setBrand} />)

    await waitFor(async () => {
      const brandFilterElement = screen.getByTestId('filter-bar-brand')
      await user.click(brandFilterElement)

      const brandAdidas = screen.getByTestId('filter-bar-brand-adidas')

      await user.click(brandAdidas)
      expect(setBrand).toHaveBeenCalledWith('adidas')
    })
  })

  test('calls setType when type is selected', async () => {
    user.setup()
    const setType = vi.fn()
    render(<FilterBar type='jordan' setType={setType} />)

    await waitFor(async () => {
      const typeFilterElement = screen.getByTestId('filter-bar-type')
      await user.click(typeFilterElement)

      const typeBasketballElement = screen.getByTestId(
        'filter-bar-type-basketball'
      )

      await user.click(typeBasketballElement)
      expect(setType).toHaveBeenCalledWith('basketball')
    })
  })
})
