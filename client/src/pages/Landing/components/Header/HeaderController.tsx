type Props = {
  handleSlide: (arg: number) => void
}

const HeaderController = ({ handleSlide }: Props) => {
  return (
    <div className='relative'>
      <div className='absolute bottom-[45px] right-[10%] z-50 flex gap-x-7'>
        <button
          className='p-3 border border-white rounded-full border-opacity-20'
          aria-label='Previous slide'
          data-test-id='prev-slide'
          onClick={() => handleSlide(-1)}
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
              stroke='white'
              strokeWidth='1.2'
            />
          </svg>
        </button>
        <button
          className='p-3 border border-white rounded-full border-opacity-20'
          aria-label='Next slide'
          data-testid='next-slide'
          onClick={() => handleSlide(+1)}
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
              stroke='white'
              strokeWidth='1.2'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default HeaderController
