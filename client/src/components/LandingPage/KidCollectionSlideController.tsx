import { MouseEventHandler } from 'react'
import tw from 'twin.macro'

type Props = {
  controlSlide: (arg: string) => MouseEventHandler<HTMLButtonElement>
}
const KidCollectionController = ({ controlSlide }: Props) => {
  return (
    <Wrapper>
      <div className='mb-24'>
        <Title>New Kids Collection</Title>
        <Description>
          We are proud of our new work and are happy to present them to you.
        </Description>
      </div>
      <div className='flex gap-x-5'>
        <ArrowIcon
          aria-label='Previous slide'
          data-test-id='prev-slide'
          onClick={controlSlide('minus')}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M11 6.5L5.5 12M5.5 12L11 17.5M5.5 12H20'
              stroke='black'
              strokeWidth='1.2'
            />
          </svg>
        </ArrowIcon>
        <ArrowIcon
          aria-label='Next slide'
          data-testid='next-slide'
          onClick={controlSlide('plus')}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M13 6.5L18.5 12M18.5 12L13 17.5M18.5 12H4'
              stroke='black'
              strokeWidth='1.2'
            />
          </svg>
        </ArrowIcon>
      </div>
    </Wrapper>
  )
}

const Wrapper = tw.div`flex flex-col w-80 overflow-hidden`
const Title = tw.h1`text-7xl text-primary-black font-bold leading-[93.6px] mb-5`
const Description = tw.p`text-neutral-dark-grey text-lg leading-7`
const ArrowIcon = tw.button`p-3 border border-neutral-soft-grey rounded-full`

export default KidCollectionController
