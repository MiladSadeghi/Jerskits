import { MouseEventHandler } from 'react'
import tw from 'twin.macro'
import { ArrowRight } from '../../../../icons'

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
          <ArrowRight className='rotate-180' />
        </ArrowIcon>
        <ArrowIcon
          aria-label='Next slide'
          data-testid='next-slide'
          onClick={controlSlide('plus')}
        >
          <ArrowRight />
        </ArrowIcon>
      </div>
    </Wrapper>
  )
}

const Wrapper = tw.div`flex flex-col w-full sm:w-80 overflow-hidden mb-12 xl:mb-0`
const Title = tw.h1`text-5xl sm:text-6xl md:text-7xl text-primary-black font-bold leading-[63px] md:leading-[93.6px] mb-5`
const Description = tw.p`text-neutral-dark-grey text-lg leading-7 break-words`
const ArrowIcon = tw.button`p-3 border border-neutral-soft-grey rounded-full`

export default KidCollectionController
