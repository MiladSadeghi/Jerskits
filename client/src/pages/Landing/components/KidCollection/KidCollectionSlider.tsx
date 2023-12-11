import { forwardRef } from 'react'
import { IProduct } from '../../../../shared/types/Product.types'
import {
  ProductCardContainer,
  ProductCardSkeleton
} from '../../../../components'

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
      <div
        ref={ref}
        className='flex px-4 mb-24 overflow-hidden gap-x-7 scroll-smooth'
      >
        <ProductCardContainer products={products} />
      </div>
    )
  }
)

export default KidCollectionSlider
