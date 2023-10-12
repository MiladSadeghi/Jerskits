import { forwardRef } from 'react'
import { IProduct } from '../../shared/types/Product.types'
import { ProductCard, ProductCardSkeleton } from '..'
import tw from 'twin.macro'

type Props = {
  products: IProduct[] | undefined
  isLoading: boolean
  isError: boolean
}

const KidCollectionSlider = forwardRef<HTMLDivElement, Props>(
  ({ products, isLoading, isError }, ref) => {
    const productCardSkeletonArray = new Array(3).fill(null)

    if (isLoading || !products || isError) {
      return (
        <div className='flex mb-24 overflow-hidden gap-x-7'>
          {productCardSkeletonArray.map((_, idx: number) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      )
    }
    return (
      <Wrapper ref={ref}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Wrapper>
    )
  }
)

const Wrapper = tw.div`overflow-hidden flex gap-x-7 mb-24 scroll-smooth px-4`

export default KidCollectionSlider
