import { useState } from 'react'
import { ArrowRight } from '../../../icons'

type TProductImageSliderProps = {
  images: string[]
  productName: string
}

const ProductImageSlider = ({
  images,
  productName
}: TProductImageSliderProps) => {
  const [currentImageIdx, setCurrentImageIdx] = useState<number>(1)
  const changeImageIdx = (direction: number) => {
    if (
      currentImageIdx + direction <= (images.length ?? 0) &&
      currentImageIdx + direction > 0
    ) {
      setCurrentImageIdx(currentImageIdx + direction)
    }
  }
  return (
    <div className='flex flex-col gap-y-3'>
      <div className='w-full bg-neutral-light-grey h-[470px] md:h-[600px]'>
        <img
          className='object-contain w-full h-full'
          src={images[currentImageIdx - 1]}
          key={`${productName}-${currentImageIdx}-image`}
          alt={`${productName}`}
        />
      </div>
      <div className='w-full h-[80px] bg-neutral-light-grey flex justify-between items-center px-4'>
        <div className='cursor-pointer' onClick={() => changeImageIdx(-1)}>
          <ArrowRight className='rotate-180' />
        </div>
        <p>
          {currentImageIdx}/{images.length}
        </p>
        <div className='cursor-pointer' onClick={() => changeImageIdx(+1)}>
          <ArrowRight />
        </div>
      </div>
    </div>
  )
}

export default ProductImageSlider
