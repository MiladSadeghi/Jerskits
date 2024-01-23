import { forwardRef } from 'react'
import { IProduct } from '../../../../shared/types/Product.types'
import {
  ProductCardContainer,
  ProductCardSkeleton
} from '../../../../components'

type Props = {
  products?: IProduct[]
  isLoading: boolean
  isError: boolean
}

const KidCollectionSlider = forwardRef<HTMLDivElement, Props>(
  ({ products, isLoading, isError }, ref) => {
    const productCardSkeletonArray = new Array(3).fill(null)

    if (isLoading || !products || isError) {
      return (
        <div className='flex overflow-hidden gap-x-7'>
          {productCardSkeletonArray.map((_, idx: number) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      )
    }
    return (
      <div
        ref={ref}
        className='flex-nowrap flex px-4 overflow-hidden gap-x-7 scroll-smooth'
      >
        <ProductCardContainer products={products} cardWidth={370} />
      </div>
    )
  }
)

export default KidCollectionSlider
