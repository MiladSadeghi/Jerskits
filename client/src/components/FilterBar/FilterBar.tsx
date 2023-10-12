import { Dispatch, SetStateAction } from 'react'
import { TBrand, TGender, TType } from '../../shared/types/Product.types'
import tw from 'twin.macro'

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
  gender?: TGender
  setGender?: setState<TGender>
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
  gender,
  setGender,
  brand,
  setBrand,
  type,
  setType,
  sort,
  setSort
}: Props) => {
  return (
    <Wrapper>
      <div className='px-12 border py-7 border-neutral-soft-grey'></div>
    </Wrapper>
  )
}

const Wrapper = tw.div`container mx-auto mb-12 col-span-full`

export default FilterBar
