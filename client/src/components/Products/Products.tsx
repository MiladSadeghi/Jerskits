import tw from 'twin.macro'
import FilterBar from '../FilterBar/FilterBar'
import { ProductCard, ProductCardSkeleton } from '..'
import { IProduct, TGender } from '../../shared/types/Product.types'
import { useLazyGetProductsQuery } from '../../services'
import { useEffect } from 'react'

type Props = {
  title?: string
  gender?: TGender
}

const Products = ({ title }: Props) => {
  const [getProducts, { isLoading, isError, data, isSuccess }] =
    useLazyGetProductsQuery()

  useEffect(() => {
    getProducts({})
  }, [])

  const productCardSkeletonArray = new Array(6).fill(null)

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      <FilterBar />

      <ProductWrapper>
        {(isLoading || isError) &&
          productCardSkeletonArray.map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        {isSuccess &&
          data?.products.map((product: IProduct) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </ProductWrapper>
    </Wrapper>
  )
}

const Wrapper = tw.div`container mx-auto my-24 flex flex-col`
const Title = tw.h1`mb-12 text-center text-7xl font-bold leading-[93.6px] text-primary-black`
const ProductWrapper = tw.div`gap-x-7 gap-y-12 grid grid-cols-3`

export default Products
