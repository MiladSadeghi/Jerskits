import { MouseEventHandler } from 'react'
import { ArrowRight } from '../../../../icons'

type Props = {
  controlSlide: (arg: string) => MouseEventHandler<HTMLButtonElement>
}
const KidCollectionController = ({ controlSlide }: Props) => {
  return (
    <div className='flex flex-col w-full mb-12 overflow-hidden sm:w-80 xl:mb-0'>
      <div className='mb-24'>
        <h1 className='text-5xl sm:text-6xl md:text-7xl text-primary-black font-bold leading-[63px] md:leading-[93.6px] mb-5'>
          New Kids Collection
        </h1>
        <p className='text-lg leading-7 break-words text-neutral-dark-grey'>
          We are proud of our new work and are happy to present them to you.
        </p>
      </div>
      <div className='flex gap-x-5'>
        <button
          className='p-3 border rounded-full border-neutral-soft-grey'
          aria-label='Previous slide'
          data-test-id='prev-slide'
          onClick={controlSlide('minus')}
        >
          <ArrowRight className='rotate-180' />
        </button>
        <button
          className='p-3 border rounded-full border-neutral-soft-grey'
          aria-label='Next slide'
          data-testid='next-slide'
          onClick={controlSlide('plus')}
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  )
}

export default KidCollectionController
