import Skeleton from 'react-loading-skeleton'
import { FC } from 'react'

type Props = {
  key?: string | number
}

const ProductCardSkeleton: FC<Props> = () => {
  return (
    <div className='min-w-full w-full xl:min-w-[380px]'>
      <Skeleton className='h-[440px] w-full mb-5' />
      <div className='leading-9 mb-2.5'>
        <Skeleton count={1.5} />
      </div>
      <Skeleton className='w-1/4 h-3.5 mb-2.5' />
      <Skeleton className='w-1/5 h-3.5' />
    </div>
  )
}

export default ProductCardSkeleton
