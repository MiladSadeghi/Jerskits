import Skeleton from 'react-loading-skeleton'

const ProductSkeleton = () => {
  return (
    <div className='container mx-auto my-24'>
      <div className='grid justify-between grid-cols-1 xl:grid-cols-2'>
        <div className='order-1 '>
          <div className='flex flex-col gap-y-3'>
            <Skeleton className='h-[600px]' containerClassName='w-full' />
            <Skeleton className='h-[80px]' containerClassName='w-full' />
          </div>
        </div>
        <div className='order-2 w-full row-span-2 xl:w-96 mt-14 xl:mt-0 justify-self-end'>
          <div>
            <Skeleton width={50} height={50} className='mb-2.5' />
            <Skeleton count={1.5} height={25} className='leading-[48px]' />
            <div className='flex justify-between mb-2.5'>
              <Skeleton
                count={0.4}
                height={20}
                containerClassName='flex-1 flex'
              />
              <Skeleton
                count={0.7}
                height={20}
                containerClassName='flex-1 flex justify-end'
              />
            </div>
            <Skeleton height={36} count={0.25} />
            <div className='h-0.5 my-7 border-bottom-1 bg-neutral-light-grey' />
            <div className='flex justify-between mb-5'>
              <Skeleton
                count={0.4}
                height={20}
                containerClassName='flex-1 flex'
              />
              <Skeleton
                count={0.4}
                height={20}
                containerClassName='flex-1 flex justify-end'
              />
            </div>
            <Skeleton count={1.2} height={30} className='leading-[48px] ' />
            <Skeleton className='mb-5 leading-10 mt-7' />
            <Skeleton className='leading-10' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSkeleton
