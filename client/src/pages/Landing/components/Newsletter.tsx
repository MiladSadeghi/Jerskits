import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { ArrowRight } from '../../../icons'

const Newsletter = () => {
  const isMedium = useMediaQuery('only screen and (min-width: 640px)')
  return (
    <div className='container flex items-center justify-center mx-auto my-24'>
      <div className='w-full h-full py-12 px-7 md:px-24 md:py-20 bg-primary-black'>
        <h1 className='text-white font-bold leading-[150%] text-[32px] md:text-[42px] text-center mb-2.5'>
          Subscribe To Our Newsletter
        </h1>
        <p className='mb-12 text-lg leading-7 text-center text-neutral-dark-grey'>
          Type your email down bellow and get the new notifications about
          Jerskits.
        </p>
        <div className='relative flex items-center justify-center'>
          <div className='relative h-[70px] w-10/12 lg:w-8/12 xl:w-6/12 2xl:w-5/12 3xl:w-4/12'>
            <input
              type='email'
              placeholder='Add your email here'
              className='w-full h-full border-none focus:ring-0 text-sm md:text-base px-6 md:px-6 py-2.5 md:py-6'
            />
            <button className='w-fit h-fit py-4 px-4 md:px-7 mr-2.5 text-base font-bold text-white leading-[150%] absolute right-0 bg-primary-black top-1/2 -translate-y-1/2'>
              {isMedium ? 'SUBSCRIBE' : <ArrowRight width={20} height={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
