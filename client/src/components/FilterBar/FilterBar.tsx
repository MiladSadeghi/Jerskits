import { Dispatch, SetStateAction } from 'react'
import { TBrand, TType } from '../../shared/types/Product.types'

type Price = {
  minPrice: number
  maxPrice: number
}

type Sort = 'first' | 'last' | 'lowprice' | 'highprice'

type setState<T> = Dispatch<SetStateAction<T>>

type Props = {
  price?: Price
  setPrice?: setState<Price>
  color?: string
  setColor?: setState<string>
  size?: string
  setSize?: setState<string>
  brand?: TBrand
  setBrand?: setState<TBrand>
  type?: string
  setType?: setState<TType>
  sort?: Sort
  setSort?: setState<Sort>
}

const FilterBar = ({
  price,
  setPrice,
  color,
  setColor,
  size,
  setSize,
  brand,
  setBrand,
  type,
  setType,
  sort,
  setSort
}: Props) => {
  return <div>FilterBar</div>
}

export default FilterBar
