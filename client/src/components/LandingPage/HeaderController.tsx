import { forwardRef } from 'react'
import tw from 'twin.macro'

type Props = {
  slide: number
  setSlide: (arg: number) => void
  maxSlide: number
}

const HeaderController = forwardRef<HTMLDivElement, Props>(
  ({ slide, setSlide, maxSlide }, ref) => {
    const changeSlide = (amount: number) => {
      // Check if ref exists and has a 'current' property before accessing it
      if (ref && 'current' in ref && ref.current) {
        const newSlide = slide + amount
        const clampedSlide = Math.max(0, Math.min(newSlide, maxSlide))

        setTimeout(() => {
          if (
            ref &&
            'current' in ref &&
            ref.current &&
            typeof ref.current.scrollTo === 'function'
          ) {
            ref.current.scrollTo({
              left: ref.current.offsetWidth * clampedSlide,
              behavior: 'smooth'
            })
          }
        }, 550)
        setSlide(clampedSlide)
      }
    }
    return (
      <div className='relative'>
        <div className='absolute bottom-[45px] right-[10%] z-50 flex gap-x-7'>
          <ArrowIcon data-test-id='prev-slide' onClick={() => changeSlide(-1)}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M11 6.5L5.5 12M5.5 12L11 17.5M5.5 12H20'
                stroke='white'
                strokeWidth='1.2'
              />
            </svg>
          </ArrowIcon>
          <ArrowIcon data-testid='next-slide' onClick={() => changeSlide(+1)}>
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13 6.5L18.5 12M18.5 12L13 17.5M18.5 12H4'
                stroke='white'
                strokeWidth='1.2'
              />
            </svg>
          </ArrowIcon>
        </div>
      </div>
    )
  }
)

const ArrowIcon = tw.button`p-3 border border-white border-opacity-20 rounded-full`

export default HeaderController
