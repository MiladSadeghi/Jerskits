import { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { TLandingPageHeaderProduct } from '../../../../shared/types/LandingPage.types'
import HeaderSlide from './HeaderSlide'
import HeaderController from './HeaderController'

type Props = {
  products: TLandingPageHeaderProduct[] | undefined
  isError: boolean
  isLoading: boolean
}

const Header = ({ products, isError, isLoading }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false)

  useEffect(() => {
    const imagesSrc = products
      ?.map((product) => product.gallery)
      .reduce((a, b) => a.concat(b), [])
    let loadedImages = 0

    imagesSrc?.forEach((src) => {
      preloadImage(src, () => {
        loadedImages++
        if (loadedImages === imagesSrc?.length) {
          setImagesLoaded(true)
        }
      })
    })
  }, [products])

  const preloadImage = (src: string, callback: () => void): void => {
    const image = new Image()
    image.onload = callback
    image.src = src
  }

  if (isLoading || isError || !products || !imagesLoaded) {
    return (
      <Skeleton
        containerClassName='h-screen block'
        className='h-full leading-normal rounded-none'
        containerTestId='landingpage-header'
      />
    )
  }

  const changeSlide = (amount: number) => {
    const newSlide = currentSlide + amount
    const maxSlide = products.length - 1
    const clampedSlide = Math.max(0, Math.min(newSlide, maxSlide))

    setTimeout(() => {
      containerRef?.current?.scrollTo({
        left: containerRef.current.offsetWidth * clampedSlide,
        behavior: 'smooth'
      })
    }, 550)
    setCurrentSlide(clampedSlide)
  }

  return (
    <header>
      <div
        className='relative flex overflow-hidden h-[934px]'
        ref={containerRef}
      >
        {products.map((product: TLandingPageHeaderProduct, index: number) => (
          <HeaderSlide
            product={product}
            currentSlide={currentSlide}
            key={product._id}
            index={index}
          />
        ))}
      </div>
      <HeaderController handleSlide={changeSlide} />
    </header>
  )
}

export default Header
