import { TBrand, TGender, TSort, TType } from '../shared/types/Product.types'

type Props = {
  minPrice?: number
  maxPrice?: number
  color?: string
  size?: string
  gender?: TGender
  brand?: TBrand
  type?: TType
  sort?: TSort
  page?: number
}

type Return = { generateQuery: ({ ...props }: Props) => Props }

export function useProductFilterQuery(): Return {
  const generateQuery = ({
    minPrice,
    maxPrice,
    color,
    size,
    gender,
    brand,
    type,
    sort,
    page
  }: Props) => {
    const queryParams: Props = {}

    if (minPrice !== undefined) {
      queryParams.minPrice = minPrice
    }

    if (maxPrice !== undefined) {
      queryParams.maxPrice = maxPrice
    }

    if (color !== undefined) {
      queryParams.color = color
    }

    if (size !== undefined) {
      queryParams.size = size
    }

    if (gender !== undefined) {
      queryParams.gender = gender
    }

    if (brand !== undefined) {
      queryParams.brand = brand
    }

    if (type !== undefined) {
      queryParams.type = type
    }

    if (sort !== undefined) {
      queryParams.sort = sort
    }

    if (page !== undefined) {
      queryParams.page = page
    }

    return { ...queryParams }
  }

  return {
    generateQuery
  }
}
