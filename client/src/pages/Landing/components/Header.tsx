import { Suspense, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { TLandingPageHeaderProduct } from '../../../shared/types/LandingPage.types'
import { HeaderController, HeaderSlideLazy } from '../../../components'

type Props = {
  products: TLandingPageHeaderProduct[] | undefined
  isError: boolean
  isLoading: boolean
}

const Header = ({ products, isError, isLoading }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  if (isLoading || isError || !products) {
    return (
      <Skeleton
        containerClassName='h-screen block'
        className='h-full leading-normal rounded-none'
        containerTestId='landingpage-header'
      />
    )
  }

  return (
    <Suspense>
      <header>
        <div className='relative flex overflow-hidden' ref={containerRef}>
          {products.map((product: TLandingPageHeaderProduct, index: number) => (
            <HeaderSlideLazy
              product={product}
              currentSlide={currentSlide}
              key={product._id}
              index={index}
            />
          ))}
        </div>
        <HeaderController
          ref={containerRef}
          slide={currentSlide}
          setSlide={setCurrentSlide}
          maxSlide={products.length - 1}
        />
      </header>
    </Suspense>
  )
}

export default Header
